var debug = require('debug')('jpush')
var pkg = require('../../package')
var JError = require('./JPushError')
var Request = require('request').defaults({
  headers: {
    'User-Agent': 'JPush-API-NodeJS-Client ' + pkg.version,
    'Connection': 'Keep-Alive',
    'Charset': 'UTF-8',
    'Content-Type': 'application/json'
  }
})
var JModel = require('./PushPayload')

var PUSH_API_URL = 'https://api.jpush.cn/v3/push'
var REPORT_API_URL = 'https://report.jpush.cn/v3'
var SCHEDULE_API_URL = 'https://api.jpush.cn/v3/schedules'  // 定时任务
var REPORT_RECEVIED = '/received'
var REPORT_USER = '/users'
var REPORT_MESSAGE = '/messages'
var HOST_NAME_SSL = 'https://device.jpush.cn'
var DEVICE_PATH = '/v3/devices'
var TAG_PATH = '/v3/tags'
var ALIAS_PATH = '/v3/aliases'
var VALIDATE = '/validate'
var CONNECT_TIMEOUT = 5 * 1000
var DEFAULT_MAX_RETRY_TIMES = 3
var READ_TIMEOUT = 30 * 1000

// Pattern
var PUSH_PATTERNS = /^[a-zA-Z0-9]{24}/
var MSG_IDS_PATTERNS = /[^\d,]/

exports.buildClient = function (appKey, masterSecret, retryTimes, isDebug) {
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    var options = arguments[0]
    return new JPushClient(options.appKey, options.masterSecret, options.retryTimes, options.isDebug)
  } else {
    return new JPushClient(appKey, masterSecret, retryTimes, isDebug)
  }
}

function JPushClient (appKey, masterSecret, retryTimes, isDebug) {
  if (!appKey || !masterSecret) {
    throw JError.InvalidArgumentError('appKey and masterSecret are both required.')
  }

  if (typeof appKey !== 'string' || typeof masterSecret !== 'string' ||
      !PUSH_PATTERNS.test(appKey) || !PUSH_PATTERNS.test(masterSecret)) {
    throw new JError.InvalidArgumentError('appKey and masterSecret format is incorrect. ' +
      'They should be 24 size, and be composed with alphabet and numbers. ' +
      'Please confirm that they are coming from JPush Web Portal.')
  }
  this.appkey = appKey
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
}

/**
 * create a push payload
 * @returns {exports.PushPayload}
 */
function push () {
  return new JModel.PushPayload(this)
}

function sendPush (payload, callback) {
  return _request(PUSH_API_URL, payload, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
}

function getReportReceiveds (msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_RECEVIED + '?msg_ids=' + msgIds
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

function getReportMessages (msgIds, callback) {
  if (MSG_IDS_PATTERNS.test(msgIds)) {
    throw new JError.InvalidArgumentError(
      'Invalid msg_ids, msg_ids should be composed with alphabet and comma.')
  }
  var url = REPORT_API_URL + REPORT_MESSAGE + '?msg_ids=' + msgIds
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

function getReportUsers (timeUnit, start, duration, callback) {
  var url = REPORT_API_URL + REPORT_USER + '?time_unit=' + timeUnit + '&start=' + start + '&duration=' + duration
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

/**
 * device api
 *
 * @param registrationId
 */
function getDeviceTagAlias (registrationId, callback) {
  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

// 结合短信业务使用，需要先调用该方法将用户的手机号码与设备的 registration id 匹配。
function setMobile (registrationId, mobileNumber, callback) {
  var json = {}
  json['mobile'] = mobileNumber

  var url = HOST_NAME_SSL + DEVICE_PATH + '/' + registrationId
  return _request(url, JSON.stringify(json), {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
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
  return _request(url, JSON.stringify(json), {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
}

function getTagList (callback) {
  var url = HOST_NAME_SSL + TAG_PATH
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

function isDeviceInTag (theTag, registrationID, callback) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag + '/registration_ids/' + registrationID
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
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
  return _request(url, JSON.stringify(json), {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
}

function deleteTag (theTag, platform, callback) {
  var url = HOST_NAME_SSL + TAG_PATH + '/' + theTag
  if (platform != null) {
    url += ('/?platform=' + platform)
  }
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'delete', 1, this.retryTimes, this.isDebug, callback)
}

function getAliasDeviceList (alias, platform, callback) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

function deleteAlias (alias, platform, callback) {
  var url = HOST_NAME_SSL + ALIAS_PATH + '/' + alias
  if (platform != null) {
    url += '/?platform=' + platform
  }
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'delete', 1, this.retryTimes, this.isDebug, callback)
}

function validate (payload, callback) {
  return _request(PUSH_API_URL + VALIDATE, payload, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
}

// 定时任务 start

function setSchedule (payload, callback) {
  return _request(SCHEDULE_API_URL, payload, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'POST', 1, this.retryTimes, this.isDebug, callback)
}

function updateSchedule (scheduleId, payload, callback) {
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(url, payload, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'PUT', 1, this.retryTimes, this.isDebug, callback)
}

// 获取有效的定时任务列表。
function getScheduleList (page, callback) {
  if (typeof page !== 'number') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the Number.')
  }
  var url = SCHEDULE_API_URL + '?page=' + page
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

// 获取指定的定时任务。
function getSchedule (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'GET', 1, this.retryTimes, this.isDebug, callback)
}

// 删除指定的定时任务。
function delSchedule (scheduleId, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Invalid argument, it can only be set to the String.')
  }
  var url = SCHEDULE_API_URL + '/' + scheduleId
  return _request(url, null, {
    user: this.appkey,
    pass: this.masterSecret
  }, 'DELETE', 1, this.retryTimes, this.isDebug, callback)
}

// 定时任务 end

// Proxy start

// Proxy end

function _request (url, body, auth, method, times, maxTryTimes, isDebug, callback) {
  if (isDebug) {
    debug('Push URL :' + url)
    if (body) {
      debug('Body :' + body)
    }
    // debug("Auth :" + JSON.stringify(auth))
    debug('Method :' + method)
    debug('Times/MaxTryTimes : ' + times + '/' + maxTryTimes)
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
      if (times < maxTryTimes) {
        return _request(url, body, auth, method, times + 1, maxTryTimes, isDebug, callback)
      } else {
        return callback(new JError.APIConnectionError('Connect timeout. Please retry later.'))
      }
    }
    if (res.statusCode === 200) {
      if (body.length !== 0) {
        if (isDebug) {
          debug('Success, response : ' + body)
        }

        try {
          callback(null, JSON.parse(body))
        } catch (e) {
          callback(e)
        }
      } else {
        if (isDebug) {
          debug('Success, response : ' + body)
        }
        callback(null, 200)
      }
    } else {
      if (isDebug) {
        debug('Fail, HttpStatusCode: ' + res.statusCode + ' result: ' + body.toString())
      }
      callback(new JError.APIRequestError(res.statusCode, body))
    }
  }

  Request[method.toLowerCase()]({
    url: url,
    body: body,
    auth: {
      user: auth.user,
      pass: auth.pass
    },
    timeout: READ_TIMEOUT
  }, _callback)
}

JPushClient.prototype.sendPush = sendPush
JPushClient.prototype.getReportReceiveds = getReportReceiveds
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
exports.DISABLE_SOUND = JModel.DISABLE_SOUND
exports.DISABLE_BADGE = JModel.DISABLE_BADGE
exports.tag = JModel.tag
exports.tag_and = JModel.tag_and
exports.alias = JModel.alias
exports.registration_id = JModel.registration_id
exports.ios = JModel.ios
exports.android = JModel.android
exports.winphone = JModel.winphone

// error
exports.APIConnectionError = JError.APIConnectionError
exports.APIRequestError = JError.APIRequestError
exports.InvalidArgumentError = JError.InvalidArgumentError
