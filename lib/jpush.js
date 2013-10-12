
var request = require('request'),
    crypto = require('popularcrypto');

request = request.defaults({
strictSSL: false, // allow us to use our self-signed cert for testing
rejectUnauthorized: false
});

var JPUSH_API_URL = 'https://api.jpush.cn:443/sendmsg/v2/sendmsg',
JPUSH_API_URL_NOTIFICATION = 'https://api.jpush.cn:443/sendmsg/v2/notification',
JPUSH_API_URL_CUSTOM_MESSAGE = 'https://api.jpush.cn:443/sendmsg/v2/custom_message';

var pushType = {
    imei: 1,
    tag: 2,
    alias: 3,
    broadcast: 4
};
JPush.prototype.pushType = pushType;

var platformType = {
    android: 'android',
    ios: 'ios',
    both: 'android,ios'
};
JPush.prototype.platformType = platformType;

function JPush(options) {
    //和官网上显示不一致，容易写错
    this.appkey = options.appkey || options.appKey || options.AppKey;
    this.masterSecret = options.masterSecret;
}

function buildVerification(sendno, receiver_type, receiver_value, master_secret) {
    return crypto.md5(sendno + '' + receiver_type +'' +receiver_value +'' +master_secret);
}

/**
 * 推送通知
 *
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {type: 1, platform: "Android",  content: {n_content: "Hello world"}}
 * @param {Object} [options] {timeToLive: 60000, overrideMsgId: '1234'}
 * @param {Function} callback function(err, body){}
 */
function pushNotification(sendno, receiver, msg, options, callback) {
    if ((typeof options === 'function') && !callback) callback = options;
    var postBody = {};
    postBody.sendno = sendno;
    postBody.app_key = this.appkey;
    postBody.receiver_type = receiver.type;
    postBody.receiver_value = receiver.value || '';
    postBody.verification_code = buildVerification(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
    postBody.msg_type = msg.type;
    postBody.msg_content = JSON.stringify(msg.content);
    postBody.platform = msg.platform;

    if (typeof options === 'object') {
        postBody.time_to_live = parseInt(options.timeToLive) || 86400;
        if (options.overrideMsgId) {
            postBody.override_msg_id = options.overrideMsgId;
        }
    }
    postJPushApi(JPUSH_API_URL, postBody, callback);
}


JPush.prototype.pushNotification = pushNotification;

/**
 * 推送自定义消息,只支持Android
 *
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content: {message: {your custom json}}}
 * @param {Object} [options] {timeToLive: 60000, overrideMsgId: '1234'}
 * @param {Function} callback function(err, body){}
 */
function pushAndroidMessage(sendno, receiver, msg, options, callback) {
    if ((typeof options === 'function') && !callback) callback = options;
    var postBody = {};
    postBody.sendno = sendno;
    postBody.app_key = this.appkey;
    postBody.receiver_type = receiver.type;
    postBody.receiver_value = receiver.value || '';
    postBody.verification_code = buildVerification(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
    postBody.msg_type = 2;
    postBody.msg_content = JSON.stringify(msg.content);
    postBody.platform = 'android';

    if (typeof options === 'object') {
        postBody.time_to_live = parseInt(options.timeToLive) || 86400;
        if (options.overrideMsgId) {
            postBody.override_msg_id = options.overrideMsgId;
        }
    }

    postJPushApi(JPUSH_API_URL, postBody, callback);
}

JPush.prototype.pushAndroidMessage = pushAndroidMessage;

/**
 * 简易推送通知,纯文本
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content:  "hello world!"}
 * @param {Object} [options] {timeToLive: 60000}
 * @param {Function} callback function(err, body){}
 */
function pushSimpleNotification (sendno, receiver, msg, options, callback) {
    if ((typeof options === 'function') && !callback) callback = options;
    var postBody = {};
    postBody.sendno = sendno;
    postBody.app_key = this.appkey;
    postBody.receiver_type = receiver.type;
    postBody.receiver_value = receiver.value || '';
    postBody.verification_code = buildVerification(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
    postBody.txt = msg.content;
    postBody.platform = msg.platform;

    if (typeof options === 'object') {
        postBody.time_to_live = parseInt(options.timeToLive) || 86400;
    }

    postJPushApi(JPUSH_API_URL_NOTIFICATION, postBody, callback);
}

JPush.prototype.pushSimpleNotification = pushSimpleNotification;

/**
 * 推送简易消息,纯文本只支持android
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content:  "hello world!"}
 * @param {Object} [options] {timeToLive: 60000}
 * @param {Function} callback function(err, body){}
 */
function pushAndroidSimpleMessage (sendno, receiver, msg, options, callback) {
    if ((typeof options === 'function') && !callback) callback = options;
    var postBody = {};
    postBody.sendno = sendno;
    postBody.app_key = this.appkey;
    postBody.receiver_type = receiver.type;
    postBody.receiver_value = receiver.value || '';
    postBody.verification_code = buildVerification(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
    postBody.txt = msg.content;
    postBody.platform = 'android';

    if (typeof options === 'object') {
        postBody.time_to_live = parseInt(options.timeToLive) || 86400;
    }

    postJPushApi(JPUSH_API_URL_CUSTOM_MESSAGE, postBody, callback);
}

JPush.prototype.pushAndroidSimpleMessage = pushAndroidSimpleMessage;

/**
 * 以下对各功能进行简单封装，提供更加简便的推送调用方式
 * 基本接口参考官网java sdk提供的接口
 * 为了方便使用，默认情况下推送的内容全部使用string而不是json
 */

/**
 * 根据imei号推送通知，其中msgContent为String格式，而不是api url要求的json格式.
 */
function sendNotificationWithImei (sendno, imei, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.imei;
    receiver.value = imei;
    var msg = {};
    msg.content = {
        n_title: msgTitle || '',
        n_content: msgContent || ''
    };
    msg.type = 1;
    msg.platform = platformType.both;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendNotificationWithImei = sendNotificationWithImei;

/**
 * 根据imei号发送消息（只有android支持）
 */
function sendCustomMessageWithImei (sendno, imei, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.imei;
    receiver.value = imei;
    var msg = {};
    msg.content = {
        title: msgTitle || '',
        message: msgContent || ''
    };
    msg.type = 2;
    msg.platform = platformType.android;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendCustomMessageWithImei = sendCustomMessageWithImei;

/**
 * 根据tag来推送通知
 */
function sendNotificationWithTag (sendno, tag, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.tag;
    receiver.value = tag;
    var msg = {};
    msg.content = {
        n_title: msgTitle || '',
        n_content: msgContent || ''
    };
    msg.type = 1;
    msg.platform = platformType.both;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendNotificationWithTag = sendNotificationWithTag;

function sendCustomMessageWithTag (sendno, tag, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.tag;
    receiver.value = tag;
    var msg = {};
    msg.content = {
        title: msgTitle || '',
        message: msgContent || ''
    };
    msg.type = 2;
    msg.platform = platformType.android;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendCustomMessageWithTag = sendCustomMessageWithTag;

function sendNotificationWithAlias (sendno, alias, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.alias;
    receiver.value = alias;
    var msg = {};
    msg.content = {
        n_title: msgTitle || '',
        n_content: msgContent || ''
    };
    msg.type = 1;
    msg.platform = platformType.both;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendNotificationWithAlias = sendNotificationWithAlias;

function sendCustomMessageWithAlias (sendno, alias, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.alias;
    receiver.value = alias;
    var msg = {};
    msg.content = {
        title: msgTitle,
        message: msgContent
    };
    msg.type = 2;
    msg.platform = platformType.android;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendCustomMessageWithAlias = sendCustomMessageWithAlias;

function sendNotificationWithAppKey (sendno, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.broadcast;
    receiver.value = '';
    var msg = {};
    msg.content = {
        n_title: msgTitle || '',
        n_content: msgContent || ''
    };
    msg.type = 1;
    msg.platform = platformType.both;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendNotificationWithAppKey = sendNotificationWithAppKey;

function sendCustomMessageWithAppKey (sendno, msgTitle, msgContent, callback) {
    var receiver = {};
    receiver.type = pushType.broadcast;
    receiver.value = '';
    var msg = {};
    msg.content = {
        title: msgTitle || '',
        message: msgContent || ''
    };
    msg.type = 2;
    msg.platform = platformType.android;
    this.pushNotification(sendno, receiver, msg, callback);
    return;
}
JPush.prototype.sendCustomMessageWithAppKey = sendCustomMessageWithAppKey;

/*****************************************************************************************/

function postJPushApi (apiUrl,postBody ,callback) {

    var done = function (err, res, body) {
        if (err) return callback(err);

        if (res.statusCode == 200) {
            callback(null, body);
        } else {
            callback({
                statusCode: res.statusCode,
                body: body
                })
            }
        };

request.post({
url: apiUrl,
form: postBody,
timeout: 5000
}, done);

}


/**
 * 创建一个JPush 远程调用实例
 * @param {Object} options {appkey: "you app key", masterSecret: "you master secret"}
 * @return {JPush} JPush实例 build({appkey: "you app key", masterSecret: "you master secret"})
 */
function build (options) {
    return new JPush(options);
}


exports.build = build;
