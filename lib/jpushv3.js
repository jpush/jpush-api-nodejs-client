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
 * @param options
 * @returns {JPushClient}
 */
exports.buildClient = function(options) {
    return new JPushClient(options);
}

/**
 * 构建Payload推送对象
 * @param options
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
 * 推送
 * @param payload
 * @param callback
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
 * @param msg_ids
 * @param callback
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

PushPayload.prototype.toJSON = function() {
    return JSON.stringify(this.params);
}

PushPayload.prototype.alertAll = function(alert) {
    if (!this.params.notification) {
        this.params.notification = {};
    }
    this.params.notification.alert = alert;
}

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





