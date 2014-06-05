/**
 * Created by 泽帆 on 2014/5/30 0030.
 */

var should = require('should');
var JPush = require('../index');

describe('Payload test', function() {
    var appkey = '47a3ddda34b2602fa9e17c01';
    var masterSecret = 'd94f733358cca97b18b2cb98';
    var client = JPush.buildClient({appkey : appkey, masterSecret:masterSecret});
    var timeSetp = 50;
    var time = 1;
    it('Push Message', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.setMessage({
            msg_content : 'mes content',
            title : 'msg title',
            content_type : 'msg content type',
            extras : {key1 : 'value1', 'key2' : "value2"}
        });
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);

    })

    it('Push Notification', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.alertAll("Hello, JPush");
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);
    })

    it('Push Notification All', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.alertAll("Hello, JPush");
        payload.setNotification({
            alert : 'notification alert',
            android : {
                alert : 'android alert',
                title : 'android title',
                builder_id : 0,
                extras : {key1 : 'value1', 'key2' : "value2"}
            },
            ios : {
                alert : 'ios alert',
                sound : 'happy',
                badge : 1,
                'content-available' : 1,
                extras : {key1 : 'value1', 'key2' : "value2"}
            },
            winphone : {
                alert : 'winphone alert',
                title : 'winphone title',
                '_open_page' : '/friends.xaml',
                extras : {key1 : 'value1', 'key2' : "value2"}
            }
        });
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);
    })

    it('Push Notification with options test', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.alertAll("Hello, JPush");
        payload.setOptions({
            time_to_live : 60,
            apns_production : true
        });
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);
    })

    it('Push Notification with platform', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.alertAll("Hello, JPush");
        payload.setPlatform(['android', 'ios']);
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);
    })

    it('Push Notification with audience', function(done) {
        var payload = JPush.buildPayload({
            options : {
                sendno : 12345
            }
        });
        payload.alertAll("Hello, JPush");
        payload.setAudience({
            tag : ['555', '666']
        });
        setTimeout(function() {
            client.sendPush(payload, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.sendno.should.equal('12345');
                    done();
                }
            });
        }, timeSetp * time++);
    })
});