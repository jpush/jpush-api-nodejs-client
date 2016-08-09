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
      // 若 destination[property] 和 sourc[property] 都是对象，则递归。
      if (_isObject(destination[property]) && _isObject(source[property])) {
        self(destination[property], source[property])
      }

      // 若 sourc[property] 已存在，则跳过。
      if (source.hasOwnProperty(property)) {
        continue
      } else {
        source[property] = destination[property]
      }
    }
  }
}

extend = function () {
  var arr = arguments
  var result = {}
  var i

  if (!arr.length) return {}

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

/* sendRequest start */

exports.sendRequest = function (url, payload, appkey, masterSecret, callback) {
  var done = function (err, res, body) {
    if (err) return callback(err)

    if (res.statusCode === 200) {
      callback(null, JSON.parse(payload))
    } else {
      callback({
        statusCode: res.statusCode,
        body: JSON.parse(body)
      })
    }

    request.post({
      url: url,
      body: JSON.stringify(postBody),
      auth: {
        user: options.appkey,
        pass: options.masterSecret
      },
      timeout: options.timeout || 60000 // default 1 min timeout
    }, done)
  }
}

/* sendRequest end */

exports.isEmptyObject = function (obj) {
  for (var t in obj) {
    return !1
  }
  return !0
}
