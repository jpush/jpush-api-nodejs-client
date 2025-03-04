var debug = require('debug')('jpush')
var JError = require('./JPushError')
var Request2 = require('./Request2')
var JModel = require('./PushPayload')

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
var TAG_PATH = '/v3/tags'
var ALIAS_PATH = '/v3/aliases'
var VALIDATE = '/validate'
var DEFAULT_MAX_RETRY_TIMES = 3
var READ_TIMEOUT = 30 * 1000

// Pattern
var PUSH_PATTERNS = /^[a-zA-Z0-9]{24}/
var MSG_IDS_PATTERNS = /[^\d,]/

exports.buildClient = function (appKey, masterSecret, retryTimes, isDebug, readTimeOut, proxy, isGroup) {
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
    throw JError.InvalidArgumentError('appKey and masterSecret are both required.')
  }

  this.isGroup = isGroup;
  if (typeof appKey !== 'string' || typeof masterSecret !== 'string' ||
      !PUSH_PATTERNS.test(appKey) || !PUSH_PATTERNS.test(masterSecret)) {
    throw new JError.InvalidArgumentError('Key and Secret format is incorrect. ' +
      'They should be 24 size, and be composed with alphabet and numbers. ' +
      'Please confirm that they are coming from JPush Web Portal.')
  }
  this.appkey = isGroup ? 'group-' + appKey : appKey
  this.masterSecret = masterSecret
  this.isGroup = isGroup
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

function sendPush (payload, callback) {
  return _request(this, this.isGroup === true ? GROUP_API_URL : PUSH_API_URL, payload, 'POST', callback)
}

function getReportReceiveds(msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_RECEIVED + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET', callback)
}

function getReportReceivedDetail(msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_RECEIVED_DETAIL + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET', callback)
}

function getReportStatusMessage(msgId, registrationIds, date, callback) {
  if (msgId == null) {
    throw new JError.InvalidArgumentError('msgId is null!');
  }
  // if (typeof(msgId) != 'number') {
  //   throw new JError.InvalidArgumentError('msgId is not number type!');
  // }
  if (registrationIds == null) {
    throw new JError.InvalidArgumentError('registrationIds is null!');
  }
  var json = {
    "msg_id": msgId,
    "registration_ids": registrationIds
  };
  if (date) {
    json.date = date;
  }
  var url = REPORT_API_URL + REPORT_STATUS_MESSAGE;
  return _request(this, url, JSON.stringify(json), 'POST', callback);
}

function getReportMessages(msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_MESSAGE + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET', callback)
}

function getReportMessagesDetail(msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_MESSAGE_DETAIL + '?msg_ids=' + msgIds
  return _request(this, url, null, 'GET', callback)
}

function getReportUsers (timeUnit, start, duration, callback) {
  var url = REPORT_API_URL + REPORT_USER + '?time_unit=' + timeUnit + '&start=' + start + '&duration=' + duration
  return _request(this, url, null, 'GET', callback)
}

/**
 * device api
 *
 * @param registrationId
 */
function getDeviceTagAlias (registrationId, callback) {
  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(this, url, null, 'GET', callback)
}

// 结合短信业务使用，需要先调用该方法将用户的手机号码与设备的 registration id 匹配。
function setMobile (registrationId, mobileNumber, callback) {
  var json = {}
  json['mobile'] = mobileNumber

  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(this, url, JSON.stringify(json), 'POST', callback)
}

function updateDeviceTagAlias (registrationId, alias, clearTag, tagsToAdd, tagsToRemove, callback) {
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
  return _request(this, url, JSON.stringify(json), 'POST', callback)
}

function getTagList (callback) {
  var url = HOST_NAME_SSL + TAG_PATH
  return _request(this, url, null, 'GET', callback)
}

function isDeviceInTag (theTag, registrationID, callback) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag + '/registration_ids/' + registrationID
  return _request(this, url, null, 'GET', callback)
}

function addRemoveDevicesFromTag (theTag, toAddUsers, toRemoveUsers, callback) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag
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
  return _request(this, url, JSON.stringify(json), 'POST', callback)
}

function deleteTag (theTag, platform, callback) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag
  if (platform != null) {
    url += ('/?platform=' + platform)
  }
  return _request(this, url, null, 'delete', callback)
}

function getAliasDeviceList (alias, platform, callback) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(this, url, null, 'GET', callback)
}

function deleteAlias (alias, platform, callback) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(this, url, null, 'delete', callback)
}

function validate (payload, callback) {
  return _request(this, PUSH_API_URL + VALIDATE, payload, 'POST', callback)
}

// 定时任务 start

function setSchedule (payload, callback) {
  return _request(this, SCHEDULE_API_URL, payload, 'POST', callback)
}

function updateSchedule (scheduleId, payload, callback) {
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, payload, 'PUT', callback)
}

// 获取有效的定时任务列表。
function getScheduleList (page, callback) {
  if (typeof page !== 'number') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the Number.')
  }
  var url = SCHEDULE_API_URL + '?page=' + page
  return _request(this, url, null, 'GET', callback)
}

// 获取指定的定时任务。
function getSchedule (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, null, 'GET', callback)
}

// 删除指定的定时任务。
function delSchedule (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(this, url, null, 'DELETE', callback)
}

// 获取定时任务对应的所有 msg_id
function getScheduleMsgIds (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId + '/msg_ids'
  return _request(this, url, null, 'GET', callback)
}

/**
 * 获取推送唯一标识符
 * http://docs.jiguang.cn/jpush/server/push/rest_api_v3_push/#cid
 * @param {*} count 可选参数。数值类型，不传则默认为 1。范围为 [1, 1000]
 * @param {*} type 可选参数。CID 类型。取值：push（默认），schedule
 * @param {*} callback 
 */
function getCid(count, type, callback) {
  if (!count) {
    count = 1;
  }
  if (!type) {
    type = 'push';
  }
  var url = PUSH_API_URL + '/cid?count=' + count + '&type=' + type;
  return _request(this, url, null, 'GET', callback);
}

/**
 * 针对RegID方式批量单推（VIP专属接口）
 * http://docs.jiguang.cn/jpush/server/push/rest_api_v3_push/#vip
 * @param {*} singlePayloads 单推payload数组
 * @param {*} callback 
 */
function batchPushByRegid(singlePayloads, callback) {
  var url = PUSH_API_URL + '/batch/regid/single';
  return batchPush.call(this, url, singlePayloads, callback);
}

/**
 * 针对Alias方式批量单推（VIP专属接口）s
 * http://docs.jiguang.cn/jpush/server/push/rest_api_v3_push/#vip
 * @param {*} singlePayloads 单推payload数组
 * @param {*} callback 
 */
function batchPushByAlias(singlePayloads, callback) {
  var url = PUSH_API_URL + '/batch/alias/single';
  return batchPush.call(this, url, singlePayloads, callback);
}

function batchPush(url, singlePayloads, callback) {
  var client = this;
  return getCid.call(client, singlePayloads.length, 'push', function(err, res) {
    if (err) {
      return callback(err);
    }
    var body = {"pushlist":{}};
    for (var i = 0; i < singlePayloads.length; i++) {
      body.pushlist[res.cidlist[i]] = singlePayloads[i];
    }
    return _request(client, url, JSON.stringify(body), 'POST', callback);
  });
}

// 定时任务 end

/**
 * 获取用户在线状态（vip专属接口）
 * https://docs.jiguang.cn//jpush/server/push/rest_api_v3_device/#vip
 * @param {*} regIds 需要在线状态的用户 registration_id
 * @param {*} callback 
 */
function getDeviceStatus(regIds, callback) {
  var json = {
    "registration_ids": regIds
  };

  var url = HOST_NAME_SSL + DEVICE_PATH + '/status/';
  return _request(this, url, JSON.stringify(json), 'POST', callback);
}


// Proxy start

// Proxy end

function _request (client, url, body, method, callback, times = 1) {
  if (client.isDebug) {
    debug('Push URL :' + url)
    if (body) {
      debug('Body :' + body)
    }
    // debug("Auth :" + JSON.stringify(auth))
    debug('Method :' + method)
    debug('Times/MaxTryTimes : ' + times + '/' + client.maxTryTimes)
  }

  var _callback = function (err, res, body) {
    if (err) {
      if (err.code === 'ETIMEDOUT' && err.syscall !== 'connect') {
        // response timeout
        return callback(new JError.APIConnectionError(
          'Response timeout. Your request to the server may have already received, please check whether or not to push',
          true))
      } else if (err.code === 'ENOTFOUND') {
        // unknown host
        return callback(new JError.APIConnectionError('Known host : ' + url))
      }
      // other connection error
      if (times < client.maxTryTimes) {
        return _request(client, url, body, method, callback, times + 1)
      } else {
        return callback(new JError.APIConnectionError('Connect timeout. Please retry later.'))
      }
    }
    if (res.statusCode === 200) {
      if (body.length !== 0) {
        if (client.isDebug) {
          debug('Success, response : ' + body)
        }

        try {
          callback(null, JSON.parse(body))
        } catch (e) {
          callback(e)
        }
      } else {
        if (client.isDebug) {
          debug('Success, response : ' + body)
        }
        callback(null, 200)
      }
    } else {
      if (client.isDebug) {
        debug('Fail, HttpStatusCode: ' + res.statusCode + ' result: ' + body.toString())
      }
      callback(new JError.APIRequestError(res.statusCode, body))
    }
  }
  Request2(client, url, { method, body: JSON.parse(body), timeout: client.readTimeOut }, _callback);
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
JPushClient.prototype.addRemoveDevicesFromTag = addRemoveDevicesFromTag
JPushClient.prototype.deleteTag = deleteTag
JPushClient.prototype.getAliasDeviceList = getAliasDeviceList
JPushClient.prototype.deleteAlias = deleteAlias
JPushClient.prototype.getDeviceStatus = getDeviceStatus
JPushClient.prototype.validate = validate
JPushClient.prototype.getReportMessages = getReportMessages
JPushClient.prototype.getReportUsers = getReportUsers
JPushClient.prototype.getScheduleList = getScheduleList
JPushClient.prototype.getSchedule = getSchedule
JPushClient.prototype.delSchedule = delSchedule
JPushClient.prototype.setSchedule = setSchedule
JPushClient.prototype.updateSchedule = updateSchedule
JPushClient.prototype.getCid = getCid
JPushClient.prototype.batchPushByRegid = batchPushByRegid
JPushClient.prototype.batchPushByAlias = batchPushByAlias

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
