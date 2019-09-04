var JPush = require("../index.js").JPush;
var Conf = require("./Conf.js");

var client = JPush.buildClient(Conf.appKey, Conf.masterSecret);

client.getDeviceTagAlias('0900e8d85ef', function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('getDeviceTagAlias :')
    console.log(res.alias)
    console.log(res.tags)
  }
})

var tagsToAdd = ['tag1', 'tag2']

client.updateDeviceTagAlias('171976fa8a8085fcdba', 'alias1', false, tagsToAdd, [],
 function (err, res) {
   if (err) {
     if (err instanceof JPush.APIConnectionError) {
       console.log(err.message)
     } else if (err instanceof JPush.APIRequestError) {
       console.log(err.message)
     }
   } else {
     console.log('updateDeviceTagAlias :' + res)
     console.log('success')
   }
 })

client.getTagList(function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('getTagList :')
    console.log('got result:' + res.tags)
  }
})

var toAddUsers = ['18071adc030dd6faa56', '171976fa8a8085fcdba']
var toRemoveUsers = ['171976fa8a8085fcdba']

client.addRemoveDevicesFromTag('tagtag', toAddUsers, toRemoveUsers,
  function (err, res) {
    if (err) {
      if (err instanceof JPush.APIConnectionError) {
        console.log(err.message)
      } else if (err instanceof JPush.APIRequestError) {
        console.log(err.message)
      }
    } else {
      console.log('success')
    }
  })

client.isDeviceInTag('tagtag', '171976fa8a8085fcdba', function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('isDeviceInTag :')
    console.log('got result:' + res['result'])
  }
})

client.deleteTag('tag1', null, function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('deleteTag :')
    console.log('success')
  }
})

client.getAliasDeviceList('alias1', null, function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('getAliasDeviceList :')
    console.log(res.registration_ids)
  }
})

client.deleteAlias('alias2', null, function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  } else {
    console.log('deleteAlias :')
    console.log('success')
  }
})
