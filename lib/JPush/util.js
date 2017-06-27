/* extend start */
var extend
var _extend
var _isObject

_isObject = function (o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

_extend = function self (destination, source) {
  var property
  for (property in destination) {
    if (destination.hasOwnProperty(property)) {
      // 若 destination[property] 和 source[property] 都是对象，则递归。
      if (_isObject(destination[property]) && _isObject(source[property])) {
        self(destination[property], source[property])
      }

      // 若 source[property] 已存在，则跳过。
      if (!source.hasOwnProperty(property)) {
        source[property] = destination[property]
      }
    }
  }
}

extend = function () {
  var arr = arguments
  var result = {}
  var i

  if (!arr.length) {
    return {}
  }

  for (i = arr.length - 1; i >= 0; i--) {
    if (_isObject(arr[i])) {
      _extend(arr[i], result)
    }
  }

  arr[0] = result
  return result
}

exports.extend = extend

/* extend end */
