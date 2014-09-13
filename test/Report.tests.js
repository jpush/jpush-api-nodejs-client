var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');

describe('Report test', function() {
    var client;
    this.timeout(30000);
    before(function () {
        client = JPush.buildClient(Base.appKey, Base.masterSecret);
    });
    after(function () {});
    it('report test1', function(done) {
        client.getReportReceiveds('1083691241', function(err, res) {
            if (!err && res) {
                res.length.should.equal(1);
                done();
            }
        });
    });
    it('report test2', function(done) {
        client.getReportReceiveds('1083691241,', function(err, res) {
            if (!err && res) {
                res.length.should.equal(2);
                done();
            }
        });
    });
    it('report test3', function(done) {
        client.getReportReceiveds('1083691241,2023215321', function(err, res) {
            if (!err && res) {
                res.length.should.equal(2);
                done();
            }
        });
    });

});