var JPush = require('jpush-sdk')

var client = JPush.buildClient('96261ea4bcaae3f4a167a495', 'db1abbffbb619458b7785164')

client.getReportReceiveds('746522674,344076897', function (err, res) {
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
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].android_received)
      console.log(res[i].ios_apns_sent)
      console.log(res[i].msg_id)
      console.log('------------')
    }
  }
})
