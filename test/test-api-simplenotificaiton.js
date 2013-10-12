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
describe('should test all push simple notification', function () {
  var jpushClient;
  var sendno;
  jpushClient = JPush.build({appkey: "f0ce3a1fc1ab429bf41e5d9f", masterSecret: "e098d2213fbc5a93d155031f"});
  beforeEach(function () {
    sendno = getRandomInt(1, 100000);
  })

  it('should  push Simple Notification with IMEI', function (done) {
    var receiver = {};
    receiver.type = 1;
    //11be746356bd8fd8
    receiver.value = '867746015882079';

    var msg = {};
    msg.content =  'Hi! from IMEI';
    msg.platform = 'android';

    setTimeout(function () {
      jpushClient.pushSimpleNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(err);
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);

  })

  it('should push Simple Notification have options with IMEI', function (done) {
    var receiver = {};
    receiver.type = 1;
    //11be746356bd8fd8
    receiver.value = '867746015882079';

    var msg = {};
    msg.content =  'Hi! from IMEI with options';
    msg.platform = 'android';

    var options = {}
    options.timeToLive = 10000;

    setTimeout(function  () {
      jpushClient.pushSimpleNotification(sendno, receiver, msg, options,function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should push Simple Notification with tag', function (done) {
    var receiver = {};
    receiver.type = 2;
    //11be746356bd8fd8
    receiver.value = 'test';

    var msg = {};
    msg.content =  'Hi! from tag';
    msg.platform = 'android';

    setTimeout(function () {
      jpushClient.pushSimpleNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should push Simple Notification with alias', function (done) {
    var receiver = {};
    receiver.type = 3;
    //11be746356bd8fd8
    receiver.value = 'alias';

    var msg = {};
    msg.content =  'Hi! from alias';
    msg.platform = 'android';

    setTimeout(function () {
      jpushClient.pushSimpleNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should psuh notificaion with boardcast', function (done) {
    var receiver = {};
    receiver.type = 4;
    receiver.value = '';

    var msg = {};
    msg.content =  'Hi! from simple boardcast';
    msg.platform = 'android';

    this.timeout(0);
    // this api should wait 1 minute
    setTimeout(function () {
      jpushClient.pushSimpleNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 60000);
  })
});
