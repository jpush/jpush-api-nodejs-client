/**
 * JPush Error
 */


exports.APIConnectionError = APIConnectionError;
exports.APIRequestError = APIRequestError;
exports.InvalidArgumentError = InvalidArgumentError;


function APIConnectionError(message, isResponseTimeout) {
    Error.call(this, message);
    this.name = "APIConnectionError";
    this.message = message;
    this.isResponseTimeout = isResponseTimeout || false;
}

function APIRequestError(httpCode, response) {
    var message = "Push Fail, HttpStatusCode: " + httpCode + " result: " + response.toString();
    Error.call(this, message);
    this.name = "APIRequestError";
    this.message = message;
    this.httpCode = httpCode;
    this.response = response;

}


function InvalidArgumentError(message) {
    Error.call(this, message);
    this.name = "InvalidArgumentError";
    this.message = message;
}
