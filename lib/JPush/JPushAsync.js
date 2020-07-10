var debug = require('debug')('jpush')
var pkg = require('../../package')
var JError = require('./JPushError')
var Request = require('request-promise')
var headers = {
  'User-Agent': 'JPush-API-NodeJS-Client ' + pkg.version,
  'Connection': 'Keep-Alive',
  'Charset': 'UTF-8',
  'Content-Type': 'application/json'
}

var JModel = require('./PushPayloadAsync')

var PUSH_API_URL = 'https://api.jpush.cn/v3/push'
var GROUP_API_URL = 'https://api.jpush.cn/v3/grouppush'
var REPORT_API_URL = 'https://report.jpush.cn/v3'
var SCHEDULE_API_URL = 'https://api.jpush.cn/v3/schedules'  // 定时任务
var REPORT_RECEIVED = '/received'
var REPORT_RECEIVED_DETAIL = '/received/detail'
var REPORT_STATUS_MESSAGE = '/status/message'
var REPORT_USER = '/users'
var REPORT_MESSAGE = '/messages'
var REPORT_MESSAGE_DETAIL = '/messages/detail'
var HOST_NAME_SSL = 'https://device.jpush.cn'
var DEVICE_PATH = '/v3/devices'
var TAG_PATH = '/v3/tags/'
var ALIAS_PATH = '/v3/aliases'
var VALIDATE = '/validate'
var DEFAULT_MAX_RETRY_TIMES = 3
var READ_TIMEOUT = 30 * 1000

// Pattern
var PUSH_PATTERNS = /^[a-zA-Z0-9]{24}/
var MSG_IDS_PATTERNS = /[^\d,]/

exports.buildClient = function (appKey, masterSecret, retryTimes, isDebug, readTimeOut, proxy, isGroup = false) {
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    var options = arguments[0]
    return new JPushClient(options.appKey,
                           options.masterSecret,
                           options.retryTimes,
                           options.isDebug,
                           options.readTimeOut,
                           options.proxy,
                           options.isGroup
    )
  } else {
    return new JPushClient(appKey, masterSecret, retryTimes, isDebug, readTimeOut, proxy, isGroup)
  }
}

function JPushClient (appKey, masterSecret, retryTimes, isDebug, readTimeOut = null, proxy = null, isGroup) {
  if (!appKey || !masterSecret) {
    throw JError.InvalidArgumentError('Key and Secret are both required.')
  }

  this.isGroup = isGroup;
  if (typeof appKey !== 'string' || typeof masterSecret !== 'string' ||
      !PUSH_PATTERNS.test(appKey) || !PUSH_PATTERNS.test(masterSecret)) {
    throw new JError.InvalidArgumentError('appKey and masterSecret format is incorrect. ' +
      'They should be 24 size, and be composed with alphabet and numbers. ' +
      'Please confirm that they are coming from JPush Web Portal.')
  }
  this.appkey = isGroup ? 'group-' + appKey : appKey
  this.masterSecret = masterSecret
  if (retryTimes) {
    if (typeof retryTimes !== 'number') {
      throw JError.InvalidArgumentError('Invalid retryTimes.')
    }
    this.retryTimes = retryTimes
  } else {
    this.retryTimes = DEFAULT_MAX_RETRY_TIMES
  }
  if (isDebug != null) {
    this.isDebug = isDebug
  } else {
    this.isDebug = true
  }
  if (readTimeOut != null) {
    this.readTimeOut = readTimeOut
  } else {
    this.readTimeOut = READ_TIMEOUT
  }
  if (proxy != null) {
    this.proxy = proxy
  }
}

/**
 * create a push payload
 * @returns {exports.PushPayload}
 */
function push () {
  return new JModel.PushPayload(this)
}

async function sendPush (payload) {
  return _request(this, this.isGroup === true ? GROUP_API_URL : PUSH_API_URL, payload, 'POST')
}

async function getReportReceiveds(msgIds) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_RECEIVED + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET')
}

async function getReportReceivedDetail(msgIds) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_RECEIVED_DETAIL + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET')
}

function getReportStatusMessage(msgId, registrationIds, date) {
  if (msgId == null) {
    throw new JError.InvalidArgumentError('msgId is null!');
  }

  if (registrationIds == null) {
    throw new JError.InvalidArgumentError('registrationIds is null!');
  }
  var json = {
    "msg_id": msgId > Number.MAX_SAFE_INTEGER ? String(msgId) : msgId,
    "registration_ids": registrationIds
  };
  if (date != null) {
    json.date = date;
  }
  var url = REPORT_API_URL + REPORT_STATUS_MESSAGE;
  return _request(this, url, json, 'POST')
  .then(res => ({ res }))
  .catch(error => ({ err: error }));
}

async function getReportMessages(msgIds) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_MESSAGE + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET')
}

async function getReportMessagesDetail(msgIds) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_MESSAGE_DETAIL + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET')
}

async function getReportUsers (timeUnit, start, duration) {
  var url = REPORT_API_URL + REPORT_USER + '?time_unit=' + timeUnit + '&start=' + start + '&duration=' + duration
  return _request(this, url, null, 'GET')
}

/**
 * device api
 *
 * @param registrationId
 */
async function getDeviceTagAlias (registrationId) {
  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(this, url, null, 'GET')
}

// 结合短信业务使用，需要先调用该方法将用户的手机号码与设备的 registration id 匹配。
async function setMobile (registrationId, mobileNumber) {
  var json = {}
  json['mobile'] = mobileNumber

  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(this, url, json, 'POST')
}

async function updateDeviceTagAlias (registrationId, alias, clearTag, tagsToAdd, tagsToRemove) {
  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId

  if (tagsToAdd instanceof Array && tagsToRemove instanceof Array) {
    var json = {}
    var tags = {}
    if (alias != null) {
      json['alias'] = alias
    }
    if (clearTag) {
      json['tags'] = ''
    } else {
      if (tagsToAdd != null && tagsToAdd.length > 0) {
        tags['add'] = tagsToAdd
      }
      if (tagsToRemove != null && tagsToRemove.length > 0) {
        tags['remove'] = tagsToRemove
      }
      json['tags'] = tags
      debug(json)
    }
  } else {
    throw new JError.InvalidArgumentError('tagsToAdd or tagsToRemove type should be array')
  }
  return _request(this, url, json, 'POST')
}

async function getTagList () {
  var url = HOST_NAME_SSL + TAG_PATH
  return _request(this, url, null, 'GET')
}

async function isDeviceInTag (theTag, registrationID) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag + '/registration_ids/' + registrationID
  return _request(this, url, null, 'GET')
}

async function addRemoveDevicesFromTag (theTag, toAddUsers, toRemoveUsers) {
  var url = HOST_NAME_SSL + TAG_PATH + theTag
  var registrationIds = {}
  if (toAddUsers != null && toAddUsers.length > 0) {
    registrationIds['add'] = toAddUsers
  }
  if (toRemoveUsers != null && toRemoveUsers.length > 0) {
    registrationIds['remove'] = toRemoveUsers
  }
  var json = {}
  json['registration_ids'] = registrationIds
  debug(json['registration_ids'])
  return _request(this, url, json, 'POST')
}

async function deleteTag (theTag, platform) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag
  if (platform != null) {
    url += ('/?platform=' + platform)
  }
  return _request(this, url, null, 'delete')
}

async function getAliasDeviceList (alias, platform) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(this, url, null, 'GET')
}

async function deleteAlias (alias, platform) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(this, url, null, 'delete')
}

async function validate (payload) {
  return _request(this, PUSH_API_URL + VALIDATE, payload, 'POST')
}

// 定时任务 start

async function setSchedule (payload) {
  return _request(this, SCHEDULE_API_URL, payload, 'POST')
}

async function updateSchedule (scheduleId, payload) {
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, payload, 'PUT')
}

// 获取有效的定时任务列表。
async function getScheduleList (page) {
  if (typeof page !== 'number') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the Number.')
  }
  var url = SCHEDULE_API_URL + '?page=' + page
  return _request(this, url, null, 'GET')
}

// 获取指定的定时任务。
async function getSchedule (scheduleId) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, null, 'GET')
}

// 删除指定的定时任务。
async function delSchedule (scheduleId) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, null, 'DELETE')
}

// 获取定时任务对应的所有 msg_id
async function getScheduleMsgIds (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId + '/msg_ids'
  return _request(this, url, null, 'GET', callback)
}

// 定时任务 end

// Proxy start

// Proxy end

/**
 * 获取用户在线状态（vip专属接口）
 * https://docs.jiguang.cn//jpush/server/push/rest_api_v3_device/#vip
 * @param {*} regIds 需要在线状态的用户 registration_id
 */
function getDeviceStatus(regIds) {
  var json = {
    "registration_ids": regIds
  };

  var url = HOST_NAME_SSL + DEVICE_PATH + '/status/';
  return _request(this, url, json, 'POST')
    .then(res => ({ res }))
    .catch(error => ({ err: error }));
}

async function _request (client, url, body, method, times = 1) {
  if (client.isDebug) {
    debug('Push URL :' + url)
    if (body) {
      debug('Body :' + body)
    }
    // debug("Auth :" + JSON.stringify(auth))
    debug('Method :' + method)
    debug('Times/MaxTryTimes : ' + times + '/' + client.maxTryTimes)
  }

  var options = {
    method: method.toUpperCase(),
    json: true,
    uri: url,
    body: body,
    auth: {
      user: client.appkey,
      pass: client.masterSecret
    },
    timeout: client.readTimeOut,
    proxy: client.proxy
  };

  try {
    return await Request(options);
  } catch (err) {
    if (err.error.code === 'ETIMEDOUT' && err.error.syscall !== 'connect') {
      // response timeout
      throw new JError.APIConnectionError(
        'Response timeout. Your request to the server may have already received, please check whether or not to push',
        true)
    } else if (err.error.code === 'ENOTFOUND') {
      // unknown host
      throw new JError.APIConnectionError('Unknown host : ' + url)
    } else if (times < client.maxTryTimes) {
      return _request(client, url, body, method, times + 1)
    } else {
      if (client.isDebug) {
        debug('Fail, HttpStatusCode: ' + err.statusCode + ' result: ' + JSON.stringify(err.error))
      }
      throw new JError.APIRequestError(err.statusCode, JSON.stringify(err.error))
    }
  }
}

JPushClient.prototype.sendPush = sendPush
JPushClient.prototype.getReportReceiveds = getReportReceiveds
JPushClient.prototype.getReportReceivedDetail = getReportReceivedDetail
JPushClient.prototype.getReportStatusMessage = getReportStatusMessage
JPushClient.prototype.getReportMessagesDetail = getReportMessagesDetail
JPushClient.prototype.push = push
JPushClient.prototype.setMobile = setMobile
JPushClient.prototype.getDeviceTagAlias = getDeviceTagAlias
JPushClient.prototype.updateDeviceTagAlias = updateDeviceTagAlias
JPushClient.prototype.getTagList = getTagList
JPushClient.prototype.isDeviceInTag = isDeviceInTag
JPushClient.prototype.getDeviceStatus = getDeviceStatus
JPushClient.prototype.addRemoveDevicesFromTag = addRemoveDevicesFromTag
JPushClient.prototype.deleteTag = deleteTag
JPushClient.prototype.getAliasDeviceList = getAliasDeviceList
JPushClient.prototype.deleteAlias = deleteAlias
JPushClient.prototype.validate = validate
JPushClient.prototype.getReportMessages = getReportMessages
JPushClient.prototype.getReportUsers = getReportUsers
JPushClient.prototype.getScheduleList = getScheduleList
JPushClient.prototype.getSchedule = getSchedule
JPushClient.prototype.delSchedule = delSchedule
JPushClient.prototype.setSchedule = setSchedule
JPushClient.prototype.updateSchedule = updateSchedule

// exports constants and methods
exports.ALL = JModel.ALL
exports.tag = JModel.tag
exports.tag_and = JModel.tag_and
exports.tag_not = JModel.tag_not
exports.alias = JModel.alias
exports.registration_id = JModel.registration_id
exports.segment = JModel.segment
exports.abtest = JModel.abtest
exports.ios = JModel.ios
exports.android = JModel.android
exports.winphone = JModel.winphone

// error
exports.APIConnectionError = JError.APIConnectionError
exports.APIRequestError = JError.APIRequestError
exports.InvalidArgumentError = JError.InvalidArgumentError
