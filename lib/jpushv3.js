/**
 * Created by 泽帆 on 2014/5/29 0029.
 */

var request = require('request');
var Util = require('./util');

var PUSH_API_URL = 'https://api.jpush.cn/v3/push';
var REPORT_API_URL = 'https://report.jpush.cn/v2/received';

/* Builder start */
/**
 * 构建JPUSH客户端
 * @param options {appKey:"Your appkey", masterSecret:"Your masterSecret"}
 * @returns {JPushClient}
 */
exports.buildClient = function(options) {
    return new JPushClient(options);
}

/**
 * 构建Payload推送对象
 * @param options payload格式的json对象。具体可以参考REST API
 * @returns {PushPayload}
 */
exports.buildPayload = function(options) {
    return new PushPayload(options);
}

/* Builder end */


/* JPushClinet start */
function JPushClient(options) {
    this.appkey = options.appkey || options.appKey || options.AppKey;
    this.masterSecret = options.masterSecret;
    this.timeout = options.timeout;
}

/**
 * 推送payload对象
 * @param options 由JPushClient构建的推送对象，不填默认为{platform:'all', audience: 'all'}
 * @param callback(err，result) 回调函数，err：错误信息，无错误时为空， result：返回的json字符串
 */
JPushClient.prototype.sendPush = function(payload, callback) {
    var postBody = payload.toJSON();
    request.post({
        url : PUSH_API_URL,
        body : postBody,
        auth : {
            user : this.appkey,
            pass : this.masterSecret
        },
        timeout : this.timeout || 60000
    }, function(err, res, body) {
        if (err) return callback(err);

        if (res.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            console.log("sendPost error : HttpStatusCode: " + res.statusCode + " result: " + JSON.parse(body));
            callback(null, JSON.parse(body));
        }
    });
};

/**
 * 获取统计数据
 * @param msg_ids msg_id字符串，多个 msg_id 用逗号隔开，最多支持100个msg_id。
 * @param callback 回调函数，err：错误信息，无错误时为空， result：返回的json字符串
 */
JPushClient.prototype.getReport = function(msg_ids, callback) {
    var url = REPORT_API_URL + "?msg_ids=" + msg_ids;
    request.get({
        url : url,
        auth : {
            user : this.appkey,
            pass : this.masterSecret
        },
        timeout : this.timeout || 60000
    }, function(err, res, body) {
        if (err) return callback(err);

        if (res.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            console.log("getReport error : HttpStatusCode: " + res.statusCode + " result: " + JSON.parse(body));
            callback(null, JSON.parse(body));
        }
    });

}
/* JPushClinet end */


/* PushPayload start */

function PushPayload(options) {
    this.params = Util.extend({
        platform : 'all',
        audience : 'all'
    }, options);
}

/**
 * 获取当前payload的json字符串
 * @returns {*}
 */
PushPayload.prototype.toJSON = function() {
    return JSON.stringify(this.params);
}

/**
 * 设置 notification.alert 属性
 * @param alert string，通知正文
 * @returns {PushPayload}
 */
PushPayload.prototype.alertAll = function(alert) {
    if (!this.params.notification) {
        this.params.notification = {};
    }
    this.params.notification.alert = alert;
    return this;
}

/**
 * 设置对应属性
 * @param params 对应的属性对象，其会与现有payload中的属性取并集
 * @returns {PushPayload}
 */
PushPayload.prototype.setPlatform = function(platform) {
    this.params.platform = platform;
    return this;
}

PushPayload.prototype.setAudience = function(audience) {
    this.params.audience = Util.extend(this.params.audience, audience);
    return this;
}

PushPayload.prototype.setMessage = function(message) {
    this.params.message = Util.extend(this.params.message, message);
    return this;
}

PushPayload.prototype.setOptions = function(options) {
    this.params.options = Util.extend(this.params.options, options);
    return this;
}

PushPayload.prototype.setNotification = function(notification) {
    this.params.notification = Util.extend(this.params.notification, notification);
    return this;
}

PushPayload.prototype.setAndroidNotification = function(android) {
    if (!this.params.notification) {
        this.params.notification = {};
    }
    this.params.notification.android = Util.extend(this.params.notification.android, android);
    return this;
}

PushPayload.prototype.setIOSNotification = function(ios) {
    if (!this.params.notification) {
        this.params.notification = {};
    }
    this.params.notification.ios = Util.extend(this.params.notification.ios, ios);
    return this;
}

PushPayload.prototype.setWinphoneNotification = function(winphone) {
    if (!this.params.notification) {
        this.params.notification = {};
    }
    this.params.notification.winphone = Util.extend(this.params.notification.winphone, winphone);
    return this;
}
/* PushPayload end */





