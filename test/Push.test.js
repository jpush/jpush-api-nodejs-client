/**
 * Created by 泽帆 on 2014/5/30 0030.
 */

var should = require('should');
var JPush = require('../index');

describe('Payload test', function() {
    var appkey = '47a3ddda34b2602fa9e17c01';
    var masterSecret = 'd94f733358cca97b18b2cb98';
    var client = JPush.buildClient({appkey : appkey, masterSecret:masterSecret});

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
        client.sendPush(payload, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                result.sendno.should.equal('12345');
                done();
            }
        });
    })
});