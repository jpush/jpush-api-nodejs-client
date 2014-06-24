/**
 * Created by 泽帆 on 2014/5/30 0030.
 */

var should = require('should');
var JPush = require('../../index');

describe('Report test', function() {
    var appkey = '47a3ddda34b2602fa9e17c01';
    var masterSecret = 'd94f733358cca97b18b2cb98';
    var client = JPush.buildClient({appkey : appkey, masterSecret:masterSecret});
    var timeSetp = 50;
    var time = 1;

    it('Get Report test', function(done) {
        var msg_id = '510185290';

        setTimeout(function() {
            client.getReport(msg_id, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.length.should.equal(1);
                    done();
                }
            });
        }, timeSetp * time++);
    })

    it('Get Report test2', function(done) {
        var msg_id = '510185290,1379837357';

        setTimeout(function() {
            client.getReport(msg_id, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.length.should.equal(2);
                    done();
                }
            });
        }, timeSetp * time++);
    })
});