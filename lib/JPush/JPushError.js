/**
 * JPush Error
 */

exports.APIConnectionError = APIConnectionError
exports.APIRequestError = APIRequestError
exports.InvalidArgumentError = InvalidArgumentError

function APIConnectionError (message, isResponseTimeout) {
  this.name = 'APIConnectionError'
  this.message = message
  this.isResponseTimeout = isResponseTimeout || false
  this.stack = (new Error()).stack
}

APIConnectionError.prototype = Object.create(Error.prototype)
APIConnectionError.prototype.constructor = APIConnectionError

function APIRequestError (httpCode, response) {
  var message = 'Push Fail, HttpStatusCode: ' + httpCode + ' result: ' + response.toString()
  this.name = 'APIRequestError'
  this.message = message
  this.httpCode = httpCode
  this.response = response
  this.stack = (new Error()).stack
}

APIRequestError.prototype = Object.create(Error.prototype)
APIRequestError.prototype.constructor = APIRequestError

function InvalidArgumentError (message) {
  this.name = 'InvalidArgumentError'
  this.message = message
  this.stack = (new Error()).stack
}

InvalidArgumentError.prototype = Object.create(Error.prototype)
InvalidArgumentError.prototype.constructor = InvalidArgumentError