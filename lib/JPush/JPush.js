var JError = require('./JPushError');
var Request = require('request');
var JModel = require('./PushPayload');



var PUSH_API_URL = 'https://api.jpush.cn/v3/push';
var REPORT_API_URL = 'https://report.jpush.cn/v2/received';
var USER_AGENT = 'JPush-API-NodeJS-Client';
var CONNECT_TIMEOUT = 5 * 1000;
var DEFAULT_MAX_RETRY_TIMES = 5;

//Pattern
var PUSH_PATTERNS = /^[a-zA-Z0-9]{24}/;
var MSG_IDS_PATTERNS = /[^\d,]/;

exports.buildClient = function(appKey, masterSecret, retryTimes) {
    return new JPushClient(appKey, masterSecret, retryTimes);
};


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
    if (retryTimes) {
        if (typeof retryTimes != 'number') {
            throw JError.InvalidArgumentError("Invalid retryTimes.");
        }
        this.retryTimes = retryTimes;
    } else {
        this.retryTimes = DEFAULT_MAX_RETRY_TIMES;
    }
}

/**
 * create a push payload
 * @returns {exports.PushPayload}
 */
function push() {
    return new JModel.PushPayload(this);
}

function sendPush(payload, callback) {
    var header = {'User-Agent' : USER_AGENT,
        'Connection' : 'Keep-Alive',
        'Charset' : 'UTF-8',
        'Content-Type' : 'application/json'
    };
    return _request(PUSH_API_URL, payload, header, {user : this.appkey, pass : this.masterSecret}, 'POST', 1, this.retryTimes, callback);
}


function getReportReceiveds(msg_ids, callback) {
    if (MSG_IDS_PATTERNS.test(msg_ids)) {
        throw new JError.InvalidArgumentError('Invalid msg_ids, msg_ids should be composed with alphabet and comma.');
    }
    var header = {'User-Agent' : USER_AGENT,
        'Connection' : 'Keep-Alive',
        'Charset' : 'UTF-8',
        'Content-Type' : 'application/json'
    };
    var url = REPORT_API_URL + '?msg_ids=' + msg_ids;
    return _request(url, null, header, {user : this.appkey, pass : this.masterSecret}, 'GET', 1, this.retryTimes, callback);
}


function _request(url, body, headers, auth, method, times, maxTryTimes, callback) {
    console.log("Push URL :" + url);
    if (body) console.log("Body :" + body);
    console.log("Headers :" + JSON.stringify(headers));
    console.log("Auth :" + JSON.stringify(auth));
    console.log("Method :" + method);
    console.log("Times/MaxTryTimes : " + times + "/" + maxTryTimes);

    var _callback = function(err, res, body) {
        if (err) {
            if (times <= maxTryTimes) {
                return request(url, body, headers, method, times+1, maxTryTimes, callback);
            } else {
                return callback(new JError.APIConnectionError('Connect timeout. Please retry later.'));
            }
        }
        if (res.statusCode == 200) {
            console.log("Push Success, response : " + body.toString())
            callback(null, JSON.parse(body));
        } else {
            console.log("Push Fail, HttpStatusCode: " + res.statusCode + " result: " + body.toString());
            callback(new JError.APIRequestError(res.statusCode, body));
        }
    };

    if (method == 'POST' || method == 'post') {
        Request.post({
            url : url,
            body : body,
            auth : {
                user : auth.user,
                pass : auth.pass
            },
            headers : headers,
            timeout : this.timeout || 60000
        }, _callback);
    } else {
        Request.get({
            url : url,
            body : body,
            auth : {
                user : auth.user,
                pass : auth.pass
            },
            headers : headers,
            timeout : CONNECT_TIMEOUT
        }, _callback);
    }
}

JPushClient.prototype.sendPush = sendPush;
JPushClient.prototype.getReportReceiveds = getReportReceiveds;
JPushClient.prototype.push = push;


//exports constants and methods
exports.ALL = JModel.ALL;
exports.tag = JModel.tag;
exports.tag_and = JModel.tag_and;
exports.alias = JModel.alias;
exports.registration_id = JModel.registration_id;
exports.ios = JModel.ios;
exports.android = JModel.android;
exports.winphone = JModel.winphone;
//error
exports.APIConnectionError = JError.APIConnectionError;
exports.APIRequestError = JError.APIRequestError;
exports.InvalidArgumentError = JError.InvalidArgumentError;



