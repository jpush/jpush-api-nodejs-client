var JPush = require("../index.js").JPushAsync;
var client = JPush.buildClient('a1703c14b186a68a66ef86c1', '9dabdf8bb704b421759cb49c')

// 使用 proxy
// var client = JPush.buildClient('a1703c14b186a68a66ef86c1', '9dabdf8bb704b421759cb49c', null, null, null,'http://192.168.8.236:3128')

// easy push.
client.push().setPlatform(JPush.ALL)
  .setAudience(JPush.ALL)
  .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
  .send()
  .then(function(result) {
    console.log(result)
  }).catch(function(err) {
    console.log(err)
  })

// full push.
client.push().setPlatform('ios', 'android')
  .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
  .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
  .setMessage('msg content')
  .setOptions(null, 60)
  .send()
  .then(function(result) {
    console.log(result)
  }).catch(function(err) {
    console.log(err)
  })
