/**
 * Created by 泽帆 on 2014/6/19 0019.
 */

var JError = require('./JPushError');
var Request = require('request');
//var util = require('util');
//var Util = require('./util');



var PUSH_API_URL = 'https://api.jpush.cn/v3/push';
var REPORT_API_URL = 'https://report.jpush.cn/v2/received';
var USER_AGENT = 'JPush-API-NodeJS-Client';
var CONNECT_TIMEOUT = 5;
var READ_TIMEOUT = 30;
var DEFAULT_MAX_RETRY_TIMES = 5;

//Pattern
var PUSH_PATTERNS = /[^a-zA-Z0-9]/;

exports.buildClient = function(appKey, masterSecret, retryTimes) {
    return new JPushClient(appKey, masterSecret, retryTimes);
};
exports.APIConnectionError = Error.APIConnectionError;
exports.APIRequestError = Error.APIRequestError;
exports.InvalidArgumentError = Error.InvalidArgumentError;

function JPushClient(appKey, masterSecret, retryTimes) {
    if (!appKey || !masterSecret) {
        throw JError.InvalidArgumentError('appKey and masterSecret are both required.');
    }
    if (typeof appKey !== 'string'
        || typeof masterSecret !== 'string'
        || !PUSH_PATTERNS.test(appKey)
        || !PUSH_PATTERNS.test(masterSecret)) {

        throw new JError.InvalidArgumentError('appKey and masterSecret format is incorrect. '
            + 'They should be 24 size, and be composed with alphabet and numbers. '
            + 'Please confirm that they are coming from JPush Web Portal.');

    }
    this.appkey = appKey;
    this.masterSecret = masterSecret;
    if (!retryTimes) {
        if (isNotNumber(retryTimes)) {
            throw JError.InvalidArgumentError("Invalid retryTimes.");
        }
        this.retryTimes = DEFAULT_MAX_RETRY_TIMES;
    }
}

function sendPush() {
}



