/**
 * @author: youxiachai
 * @Date: 13-8-31
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

var should = require('should');
var JPush = require('../index');
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 *   // 4 means broadcast should wait 1 minute;
 if (receiver.type == 4) {
    if (!broadcastTimers) {
      var oneSecond = 60;
      broadcastTimers = setInterval(function () {
        oneSecond = oneSecond - 1;
        console.log(oneSecond);
        if (broadcastTimers == 0) {
          clearInterval(broadcastTimers);
          broadcastTimers = null;
        }
      }, 1000);

    } else {
      return callback(broadcastTimers);
    }
     // 1
    var IMEI = '';
    //2
    var tag = '';
    //3
    var alias = ''
    //4
    var bora = 4;
  }
 */
describe('should test all push message', function () {
  var jpushClient = JPush.build({appkey: "f0ce3a1fc1ab429bf41e5d9f", masterSecret: "e098d2213fbc5a93d155031f"});
  var sendno;
  beforeEach(function () {
    sendno = getRandomInt(1, 100000);
  })

  it('should push message with IMEI', function (done) {
    var receiver = {};
    receiver.type = 1;
    //11be746356bd8fd8
    receiver.value = '867746015882079';

    var msg = {};
    msg.content = {
      message: {
        ok: true
      }
    };
    setTimeout(function () {
      jpushClient.pushAndroidMessage(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done()
      });
    }, 500);

  })

  it('should push message with tag', function (done) {
    var receiver = {};
    receiver.type = 2;
    //11be746356bd8fd8
    receiver.value = 'test';

    var msg = {};
    msg.content = {
      message: {
        ok: true
      }
    };

    setTimeout(function () {
      jpushClient.pushAndroidMessage(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done()
      });
    }, 500);
  })

  it('should push message with alias', function (done) {
    var receiver = {};
    receiver.type = 3;
    //11be746356bd8fd8
    receiver.value = 'alias';

    var msg = {};
    msg.content = {
      message: {
        ok: true
      }
    };

    setTimeout(function () {
      jpushClient.pushAndroidMessage(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done()
      });
    }, 500);
  })

  it('should send simple push message with boardcast', function (done) {
    var receiver = {};
    receiver.type = 4;
    receiver.value = '';

    var msg = {};
    msg.content = {
      message: {
        ok: true
      }
    };
// this api should wait 1 minute
    this.timeout(0);
    setTimeout(function () {
    jpushClient.pushAndroidMessage(sendno, receiver, msg, function (err, body) {
      if (err) return  done(JSON.stringify(err));
      body.should.include('"errmsg":"Succeed"');
      done();
    })}, 60000);

  })
});
