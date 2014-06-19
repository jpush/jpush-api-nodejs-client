/**
 * Created by 泽帆 on 2014/6/19 0019.
 */


function PushPayload(client) {
    this.client = client;
}

/**
 * 获取当前payload的json字符串
 * @returns {*}
 */
PushPayload.prototype.toJSON = function() {
    return JSON.stringify(this.params);
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





