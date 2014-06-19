/**
 * JPush Error
 */


exports.APIConnectionError = APIConnectionError;
exports.APIRequestError = APIRequestError;
exports.InvalidArgumentError = InvalidArgumentError;


function APIConnectionError(message) {
    Error.call(this, message);
    this.name = "APIConnectionError";
    this.message = message;
}

function APIRequestError(message) {
    Error.call(this, message);
    this.name = "APIRequestError";
    this.message = message;
}


function InvalidArgumentError(message) {
    Error.call(this, message);
    this.name = "InvalidArgumentError";
    this.message = message;
}
