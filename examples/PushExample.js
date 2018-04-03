var JPush = require("../index.js");
var client = JPush.buildClient('a1703c14b186a68a66ef86c1', '9dabdf8bb704b421759cb49c')

// 使用 proxy
// var client = JPush.buildClient('a1703c14b186a68a66ef86c1', '9dabdf8bb704b421759cb49c', null, null, null,'http://192.168.8.236:3128')

// easy push.
client.push().setPlatform(JPush.ALL)
  .setAudience(JPush.ALL)
  .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
  .send(function (err, res) {
    if (err) {
      if (err instanceof JPush.APIConnectionError) {
        console.log(err.message)
      } else if (err instanceof JPush.APIRequestError) {
        console.log(err.message)
      }
    } else {
      console.log('Sendno: ' + res.sendno)
      console.log('Msg_id: ' + res.msg_id)
    }
  })

// full push.
client.push().setPlatform('ios', 'android')
  .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
  .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
  .setMessage('msg content')
  .setOptions(null, 60)
  .send(function (err, res) {
    if (err) {
      if (err instanceof JPush.APIConnectionError) {
        console.log(err.message)
        // Response Timeout means your request to the server may have already received,
        // please check whether or not to push
        console.log(err.isResponseTimeout)
      } else if (err instanceof JPush.APIRequestError) {
        console.log(err.message)
      }
    } else {
      console.log('Sendno: ' + res.sendno)
      console.log('Msg_id: ' + res.msg_id)
    }
  })
