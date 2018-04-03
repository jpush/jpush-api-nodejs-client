var JPush = require("../index.js");
var client = JPush.buildClient('96261ea4bcaae3f4a167a495', 'db1abbffbb619458b7785164')

// 设置定时任务。
client.push().setPlatform(JPush.ALL)
  .setAudience(JPush.ALL)
  .setNotification('Hi, JPush', JPush.ios('Hello'))
  .setSingleSchedule('2016-08-08 18:00:00')
  .setSchedule('Schedule_Name', true, function (err, res) {
    if (err) {
      if (err instanceof JPush.APIConnectionError) {
        console.log(err.message)
      } else if (err instanceof JPush.APIRequestError) {
        console.log(err.message)
      }
    }
  })

// 设置定期任务。
client.push().setPlatform(JPush.ALL)
  .setAudience(JPush.ALL)
  .setNotification('Hi, JPush', JPush.ios('Hello'))
  .setPeriodicalSchedule('2016-08-07 12:00:00', '2016-08-10 12:00:00', '12:00:00', 'week', 2, ['wed', 'fri'])
  .setSchedule('Schedule_Name_2', true, function (err, res) {
    if (err) {
      if (err instanceof JPush.APIConnectionError) {
        console.log(err.message)
      } else if (err instanceof JPush.APIRequestError) {
        console.log(err.message)
      }
    }
  })

// 更新定时任务。
client.push().setSingleSchedule('2016-08-10 20:00:00')
  .updateSchedule('fb8fd1a4-5c91-11e6-a6b6-0021f653c902', null, null,
    function (err, res) {
      if (err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      }
    })

// 更新定期任务。
client.push()
  .setPeriodicalSchedule('2016-08-10 12:00:00', '2016-08-11 12:00:00', '12:00:00', 'week', 3, ['wed', 'sun'])
  .updateSchedule('50713b1a-5d08-11e6-9fac-0021f653c902', null, null, function (err, res) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  })

// 获取有效的 schedule 列表, 1 代表请求页页数，每页最多返回 50 个任务。
client.getScheduleList(1, function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  }
})

// 获取指定的 schedule。
client.getSchedule('fb8fd1a4-5c91-11e6-a6b6-0021f653c902', function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  }
})

// 删除指定的 schedule。
client.delSchedule('97aa062c-5c92-11e6-a6ab-0021f652c102', function (err, res) {
  if (err) {
    if (err instanceof JPush.APIConnectionError) {
      console.log(err.message)
    } else if (err instanceof JPush.APIRequestError) {
      console.log(err.message)
    }
  }
})
