var JPush = require('jpush-sdk')
var client = JPush.buildClient('dd1066407b044738b6479275', '6b135be0037a5c1e693c3dfa')

// easy push
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

// full push .
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
