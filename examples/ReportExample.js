var JPush = require('jpush-sdk')

var client = JPush.buildClient('dd1066407b044738b6479275', '6b135be0037a5c1e693c3dfa')

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
