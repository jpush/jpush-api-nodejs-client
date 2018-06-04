/* eslint-disable camelcase */

var JError = require('./JPushError')
var JUtil = require('./util')

function PushPayload (client) {
  this.client = client
  this.payload = {}
  this.trigger = {}
}

function setPlatform () {
  if (arguments.length < 1) {
    throw new JError.InvalidArgumentError("platform's args cannot all be null")
  }

  var platform, i

  if (arguments.length === 1 && arguments[0] === ALL) {
    platform = ALL
  } else if (arguments.length === 1 && typeof arguments[0] === 'object') {
    platform = []
    for (i = 0; i < arguments[0].length; i++) {
      if (VALID_DEVICE_TYPES.indexOf(arguments[0][i]) !== -1) {
        if (platform.indexOf(arguments[0][i]) === -1) {
          platform.push(arguments[0][i])
        }
      } else {
        throw new JError.InvalidArgumentError("Invalid device type '" + arguments[0][i] +
          "', platform can only be set to 'android', 'ios' or 'winPhone'")
      }
    }
  } else {
    platform = []
    for (i = 0; i < arguments.length; i++) {
      if (VALID_DEVICE_TYPES.indexOf(arguments[i]) !== -1) {
        if (platform.indexOf(arguments[i]) === -1) {
          platform.push(arguments[i])
        }
      } else {
        throw new JError.InvalidArgumentError("Invalid device type '" + arguments[i] +
          "', platform can only be set to 'android', 'ios' or 'winPhone'")
      }
    }
  }
  this.payload = JUtil.extend(this.payload, {
    'platform': platform
  })
  return this
}

function buildAudience (args, title) {
  if (args.length < 1) {
    throw new JError.InvalidArgumentError('Should be set at least one ' + title)
  }
  var payload = []
  var i
  if (args.length === 1 && typeof args[0] === 'string') {
    var tags_t = args[0].split(',')
    for (i = 0; i < tags_t.length; i++) {
      if (tags_t[i].trim().length > 0) {
        payload.push(tags_t[i].trim())
      }
    }
    if (payload.length < 1) {
      throw new JError.InvalidArgumentError('Should be set at least one ' + title)
    }
  } else if (args.length === 1 && Array.isArray(args[0])) {
    for (i = 0; i < args[0].length; i++) {
      if (typeof args[0][i] !== 'string') {
        throw new JError.InvalidArgumentError('Invalid ' + title + ' at index ' + i + ', ' +
          title + ' can only be set to the String')
      }
      payload.push(args[0][i])
    }
  } else {
    for (i = 0; i < args.length; i++) {
      if (typeof args[i] !== 'string') {
        throw new JError.InvalidArgumentError('Invalid ' + title + ' at argument ' + i + ', ' +
          title + ' can only be set to the String')
      }
      payload.push(args[i])
    }
  }
  return payload
}

function alias () {
  return {
    'alias': buildAudience(arguments, 'alias')
  }
}

function tag () {
  return {
    'tag': buildAudience(arguments, 'tag')
  }
}

function tag_and () {
  return {
    'tag_and': buildAudience(arguments, 'tag_and')
  }
}

function tag_not() {
  return {
    'tag_not': buildAudience(arguments, 'tag_not')
  }
}

function registration_id () {
  return {
    'registration_id': buildAudience(arguments, 'registration_id')
  }
}

function segment() {
  return {
    'segment': buildAudience(arguments, 'segment')
  }
}

function abtest() {
  return {
    'abtest': buildAudience(arguments, 'abtest')
  }
}

function setAudience () {
  if (arguments.length < 1) {
    throw new JError.InvalidArgumentError('audience must be set')
  }
  var audience
  if (arguments.length === 1 && arguments[0] === ALL) {
    audience = ALL
  } else {
    audience = {}
    for (var i = 0; i < arguments.length; i++) {
      audience = JUtil.extend(audience, arguments[i])
    }
  }
  this.payload = JUtil.extend(this.payload, {
    'audience': audience
  })
  return this
}

function android (alert, title, builder_id, extras, priority, category, style, value, alertType, uriActivity) {
  if (alert != null) {
    if (typeof alert !== 'string') {
      throw new JError.InvalidArgumentError('android.alert is require and only can be set to the string')
    }
  }
  var android = {
    'alert': alert
  }

  if (title != null) {
    if (typeof title !== 'string') {
      throw new JError.InvalidArgumentError('Invalid android.title, it only can be set to the string')
    }
    android['title'] = title
  }

  if (builder_id != null) {
    if (typeof builder_id !== 'number') {
      throw new JError.InvalidArgumentError('Invalid android.builder_id, it only can be set to the number')
    }
    android['builder_id'] = builder_id
  }

  if (extras != null) {
    if (typeof extras !== 'object') {
      throw new JError.InvalidArgumentError('Invalid android.extras')
    }
    android['extras'] = extras
  }

  if (priority != null) {
    if (typeof priority !== 'number') {
      throw new JError.InvalidArgumentError('Invalid android.priority, it only can be set to the number.')
    }
    android['priority'] = priority
  }

  if (category != null) {
    if (typeof category !== 'string') {
      throw new JError.InvalidArgumentError('Invalid android.category, it only can be set to the number.')
    }
    android['category'] = category
  }

  if (style != null) {
    if (typeof style !== 'number') {
      throw new JError.InvalidArgumentError('Invalid android.style, it only can be set to the number.')
    }
    if (style === 1) {
      android['big_text'] = value
    } else if (style === 2) {
      android['inbox'] = value
    } else if (style === 3) {
      android['big_pic_path'] = value
    }
  }

  if (alertType != null) {
    if (typeof alertType !== 'number') {
      throw new JError.InvalidArgumentError('Invalid android.alertType, it only can be set to the number.')
    }
    android['alert_type'] = alertType
  }

  if (uriActivity != null) {
    android['uri_activity'] = uriActivity
  }

  return {
    'android': android
  }
}

function ios (alert, sound, badge, contentAvailable, extras, category, mutableContent) {
  if (alert != null) {
    if (typeof alert !== 'string' && typeof alert !== 'object') {
      throw new JError.InvalidArgumentError('ios.alert is require and can only be set to the String or object')
    }
  }
  var ios = {
    'alert': alert
  }

  if (sound != null) {
    if (typeof sound !== 'string') {
      throw new JError.InvalidArgumentError('Invalid ios.sound, it can only be set to the String')
    }
    ios['sound'] = sound
  }

  if (badge != null) {
    ios['badge'] = badge
  }

  if (contentAvailable != null) {
    if (typeof contentAvailable !== 'boolean') {
      throw new JError.InvalidArgumentError('Invalid ios.contentAvailable, it can only be set to the Boolean')
    }
    ios['content-available'] = contentAvailable
  }

  if (extras != null) {
    if (typeof extras !== 'object') {
      throw new JError.InvalidArgumentError('Invalid ios.extras')
    }
    ios['extras'] = extras
  }

  if (category != null) {
    ios['category'] = category
  }

  if (mutableContent != null) {
    if (typeof mutableContent !== 'boolean') {
      throw new JError.InvalidArgumentError('Invalid ios.mutable-content, it can only be set to the boolean.')
    }
    ios['mutable-content'] = mutableContent
  }
  return {
    'ios': ios
  }
}

function winphone (alert, title, openPage, extras) {
  if (alert != null) {
    if (typeof alert !== 'string') {
      throw new JError.InvalidArgumentError('winphone.alert is require and can only be set to the String')
    }
  }

  var winphone = {
    'alert': alert
  }

  if (title != null) {
    if (typeof title !== 'string') {
      throw new JError.InvalidArgumentError('Invalid winphone.title, it can only be set to the String')
    }
    winphone['title'] = title
  }

  if (openPage != null) {
    if (typeof openPage !== 'string') {
      throw new JError.InvalidArgumentError('Invalid winphone.openPage, it can only be set to the String')
    }
    winphone['_open_page'] = openPage
  }

  if (extras != null) {
    if (typeof extras !== 'object') {
      throw new JError.InvalidArgumentError('Invalid winphone.extras')
    }
    winphone['extras'] = extras
  }

  return {
    'winphone': winphone
  }
}

function setNotification () {
  if (arguments.length < 1) {
    throw new JError.InvalidArgumentError('Invalid notification')
  }
  var notification = {}
  var offset = 0
  if (typeof arguments[0] === 'string') {
    notification['alert'] = arguments[0]
    offset = 1
  }
  for (; offset < arguments.length; offset++) {
    if (typeof arguments[offset] !== 'object') {
      throw new JError.InvalidArgumentError('Invalid notification argument at index ' + offset)
    }
    notification = JUtil.extend(notification, arguments[offset])
  }
  this.payload = JUtil.extend(this.payload, {
    'notification': notification
  })
  return this
}

function setMessage (msg_content, title, content_type, extras) {
  if (msg_content == null || typeof msg_content !== 'string') {
    throw new JError.InvalidArgumentError('message.msg_content is require and can only be set to the String')
  }
  var message = {
    'msg_content': msg_content
  }

  if (title != null) {
    if (typeof title !== 'string') {
      throw new JError.InvalidArgumentError('Invalid message.title, it can only be set to the String')
    }
    message['title'] = title
  }

  if (content_type != null) {
    if (typeof content_type !== 'string') {
      throw new JError.InvalidArgumentError('Invalid message.content_type, it can only be set to the String')
    }
    message['content_type'] = content_type
  }

  if (extras != null) {
    if (typeof extras !== 'object') {
      throw new JError.InvalidArgumentError('Invalid message.extras')
    }
    message['extras'] = extras
  }

  this.payload = JUtil.extend(this.payload, {
    'message': message
  })
  return this
}

// ##### 已弃用 ####
function setSmsMessage (content, delayTime) {
  var smsMessage = {}
  if (content != null) {
    if (typeof content !== 'string') {
      throw new JError.InvalidArgumentError('Invalid content, it can only be set to a string')
    }
    smsMessage['content'] = content
  }

  if (delayTime != null) {
    if (typeof delayTime !== 'number') {
      throw new JError.InvalidArgumentError('Invalid delayTime, it can only be set to a int')
    }
    smsMessage['delay_time'] = delayTime
  }

  this.payload = JUtil.extend(this.payload, {
    'sms_message': smsMessage
  })
  return this
}

function setSms (delayTime, tempId, tempPara) {
  var sms = {}

  if (delayTime != null) {
    if (typeof delayTime !== 'number') {
      throw new JError.InvalidArgumentError('Invalid delayTime, it can only be set to a int')
    }
    sms['delay_time'] = delayTime
  }

  if (tempId != null) {
    sms['temp_id'] = tempId
  }

  if (tempPara != null) {
    sms['temp_para'] = tempPara
  }

  this.payload = JUtil.extend(this.payload, {
    'sms_message': sms
  })
  return this
}

function generateSendno () {
  return (MIN_SENDNO + Math.round(Math.random() * (MAX_SENDNO - MIN_SENDNO)))
}

function setOptions (sendno, time_to_live, override_msg_id, apns_production, big_push_duration, apns_collapse_id) {
  if (sendno == null && time_to_live == null && override_msg_id == null && apns_production == null &&
    big_push_duration == null) {
    throw new JError.InvalidArgumentError("option's args cannot all be null.")
  }
  var options = {}

  if (sendno != null) {
    if (typeof sendno !== 'number') {
      throw new JError.InvalidArgumentError('Invalid options.sendno, it can only be set to the Number')
    }
    options['sendno'] = sendno
  } else {
    options['sendno'] = generateSendno()
  }

  if (time_to_live != null) {
    if (typeof time_to_live !== 'number') {
      throw new JError.InvalidArgumentError('Invalid options.time_to_live, it can only be set to the Number')
    }
    options['time_to_live'] = time_to_live
  }

  if (override_msg_id != null) {
    if (typeof override_msg_id !== 'number') {
      throw new JError.InvalidArgumentError('Invalid options.override_msg_id, it can only be set to the Number')
    }
    options['override_msg_id'] = override_msg_id
  }

  // true: 推送生产环境；false: 推送开发环境。
  if (apns_production != null) {
    if (typeof apns_production !== 'boolean') {
      throw new JError.InvalidArgumentError('Invalid options.apns_production, it can only be set to the Boolean')
    }
    options['apns_production'] = apns_production
  } else {
    options['apns_production'] = true // 如果不指定，默认推送生产环境。
  }

  if (big_push_duration != null) { // 又叫缓慢推送，设置后将在给定的 n 分钟内，匀速的向用户发送推送，最大值为 1400。
    if (typeof big_push_duration !== 'number') {
      throw new JError.InvalidArgumentError('Invalid options.big_push_duration, it can only be set to the Number')
    }

    if (big_push_duration > 1400 || big_push_duration <= 0) {
      throw new JError.InvalidArgumentError('Invalid options.big_push_duration, it should bigger than 0 and less than 1400')
    }
    options['big_push_duration'] = big_push_duration
  }

  if (apns_collapse_id != null) {
    options['apns_collapse_id'] = apns_collapse_id
  }

  this.payload = JUtil.extend(this.payload, {
    'options': options
  })
  return this
}

function toJSON () {
  this.payload.options = JUtil.extend({
    'sendno': generateSendno(),
    'apns_production': false
  }, this.payload.options)
  return JSON.stringify(this.payload)
}

function send (callback) {
  validate(this.payload)
  var body = this.toJSON()
  return this.client.sendPush(body, callback)
}

function sendValidate (callback) {
  validate(this.payload)
  var body = this.toJSON()
  return this.client.validate(body, callback)
}

// 定时任务 start
// date: 必须为 YYYY-MM-DD HH:MM:SS 格式，如："2014-02-15 12:00:00"
function setSingleSchedule (date) {
  if (typeof date !== 'string') {
    throw new JError.InvalidArgumentError('date must be set to the string.')
  }
  var single = {
    'time': date
  }
  this.trigger = JUtil.extend(this.trigger, {
    'single': single
  })
  return this
}

// 具体参数格式参照：http://docs.jiguang.cn/server/rest_api_push_schedule/#_4
function setPeriodicalSchedule (start, end, time, timeUnit, frequency, point) {
  var periodical = {
    'start': start,
    'end': end,
    'time': time,
    'time_unit': timeUnit,
    'frequency': frequency,
    'point': point
  }
  this.trigger = JUtil.extend(this.trigger, {
    'periodical': periodical
  })
  return this
}

function setSchedule (name, enabled, callback) {
  if (typeof name !== 'string') {
    throw new JError.InvalidArgumentError('name must be set to string.')
  }
  if (typeof enabled !== 'boolean') {
    throw new JError.InvalidArgumentError('enabled must be set to boolean.')
  }
  validate(this.payload)
  this.payload.options = JUtil.extend({
    'sendno': generateSendno(),
    'apns_production': false
  },
    this.payload.options)
  var body = {
    'name': name,
    'enabled': enabled,
    'trigger': this.trigger,
    'push': this.payload
  }
  return this.client.setSchedule(JSON.stringify(body), callback)
}

// scheduleId: 必填。
// name, enabled 如果为 null，则代表不更新。
function updateSchedule (scheduleId, name, enabled, callback) {
  if (typeof scheduleId !== 'string') {
    throw new JError.InvalidArgumentError('Schedule ID must be set to string.')
  }
  var body = {}
  if (name != null) {
    if (typeof name !== 'string') {
      throw new JError.InvalidArgumentError('name must be set to string.')
    }
    body = JUtil.extend(body, {
      'name': name
    })
  }
  if (enabled != null) {
    if (typeof enabled !== 'boolean') {
      throw new JError.InvalidArgumentError('enabled must be set to boolean.')
    }
    body = JUtil.extend(body, {
      'enabled': enabled
    })
  }
  if (!JUtil.isEmptyObject(this.trigger)) {
    body = JUtil.extend(body, {
      'trigger': this.trigger
    })
  }
  if (!JUtil.isEmptyObject(this.payload)) {
    validate(this.payload)
    this.payload.options = JUtil.extend({
      'sendno': generateSendno(),
      'apns_production': false
    },
      this.payload.options)
    body = JUtil.extend(body, {
      'push': this.payload
    })
  }
  return this.client.updateSchedule(scheduleId, JSON.stringify(body), callback)
}
// 定时任务 end.

/**
 * Verify the payload legitimacy, it will call by this.send()
 * @param payload
 */
function validate (payload) {
  var notification = payload.notification
  var message = payload.message
  if (!notification && !message) {
    throw new JError.InvalidArgumentError('Either or both notification and message must be set.')
  }
}

function calculateLength (str) {
  var ch = []
  var st = []
  var re = []
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i)
    st = []
    do {
      st.push(ch & 0xFF)
      ch = ch >> 8
    } while (ch)
    re = re.concat(st.reverse())
  }
  // return an array of bytes.
  return re.length
}

function isIosExceedLength () {
  var ios
  var notification = this.payload.notification
  var message = this.payload.message
  var alert = notification.alert ? notification.alert : ''
  ios = calculateLength(JSON.stringify(JUtil.extend({
    'alert': alert
  }, notification.ios)))
  if (message != null) {
    var msgLen = calculateLength(JSON.stringify(message))
    return msgLen >= 1000
  }
  return ios >= 2000
}

function isGlobalExceedLength () {
  var android = 0
  var winphone = 0
  var ios = false
  var notification = this.payload.notification
  var message = this.payload.message
  var platform = this.payload.platform

  var hasIOS = true
  if (platform !== ALL) {
    hasIOS = false
    for (var i = 0; i < platform.length; i++) {
      if (platform[i] === 'ios') {
        hasIOS = true
        break
      }
    }
  }

  if (hasIOS) {
    ios = this.isIosExceedLength()
  }

  if (notification != null) {
    var alert = notification.alert ? notification.alert : ''
    winphone = calculateLength(JSON.stringify(JUtil.extend({
      'alert': alert
    }, notification.winphone)))
    android = calculateLength(JSON.stringify(JUtil.extend({
      'alert': alert
    }, notification.android)))
  }
  if (message != null) {
    var msg_length = calculateLength(JSON.stringify(message))
    winphone += msg_length
    android += msg_length
  }
  return ios || winphone > 1000 || android > 1000
}

// ------ PushPayload prototype
PushPayload.prototype.setPlatform = setPlatform
PushPayload.prototype.setAudience = setAudience
PushPayload.prototype.setNotification = setNotification
PushPayload.prototype.setMessage = setMessage
PushPayload.prototype.setOptions = setOptions
PushPayload.prototype.toJSON = toJSON
PushPayload.prototype.send = send
PushPayload.prototype.sendValidate = sendValidate
PushPayload.prototype.setSingleSchedule = setSingleSchedule
PushPayload.prototype.setPeriodicalSchedule = setPeriodicalSchedule
PushPayload.prototype.setSchedule = setSchedule
PushPayload.prototype.updateSchedule = updateSchedule
PushPayload.prototype.isIosExceedLength = isIosExceedLength
PushPayload.prototype.isGlobalExceedLength = isGlobalExceedLength
PushPayload.prototype.setSmsMessage = setSmsMessage

// ------ private constant define ------
var VALID_DEVICE_TYPES = ['ios', 'android', 'winphone']
var MIN_SENDNO = 100000
var MAX_SENDNO = 4294967294
var ALL = 'all'

// ------ exports constants and methods -------
exports.ALL = ALL
exports.tag = tag
exports.tag_and = tag_and
exports.alias = alias
exports.registration_id = registration_id
exports.ios = ios
exports.android = android
exports.winphone = winphone
exports.setSchedule = setSchedule
// class
exports.PushPayload = PushPayload
