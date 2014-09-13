var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');
describe('device test', function() {
    this.timeout(30000);
    var client;
    before(function() {
        client = JPush.buildClient(Base.appKey, Base.masterSecret);
    });
    after(function() {
    });

    it('test updateDeviceTagAlias', function(done) {

        tagsToAdd = [ 'tag1', 'tag2' ];
        tagsToRemove = [ 'tag3', 'tag4' ];
        client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd,
                tagsToRemove, function(err, res) {
                    if (!err && res) {
                        should(res).be.ok;
                        done();
                    }
                });
    });

    it('test getDeviceTagAlias', function(done) {

        client.getReportReceiveds('1083691241', function(err, res) {
            if (!err && res) {
                console.log('get result:' + res)
                should(res).be.ok;
                done();
            }
        });
    });

    it('test getTagList', function(done) {

        client.getTagList(function(err, res) {
            if (!err && res) {
                should(res).be.ok;
                done();
            }
        });
    });

    it('test isDeviceInTag', function(done) {

        client.isDeviceInTag('tag3', '0900e8d85ef', function(err, res) {
            if (!err && res) {
                should(res).be.ok;
                done();
            }
        });
    });

    it('test addRemoveDevicesFromTag', function(done) {

        toAddUsers = [ '0900e8d85ef' ];
        toRemoveUsers = [ '0900e8d85ef' ];
        client.addRemoveDevicesFromTag('tag1', toAddUsers, toRemoveUsers,
                function(err, res) {
                    if (!err && res) {
                        should(res).be.ok;
                        done();
                    }
                });
    });

    it('test deleteTag', function(done) {

        client.deleteTag('tag4', null, function(err, res) {
            if (!err && res) {
                should(res).be.ok;
                done();
            }
        });
    });

    it('test getAliasDeviceList', function(done) {

        client.getAliasDeviceList('alias1', null, function(err, res) {
            if (!err && res) {
                should(res).be.ok;
                done();
            }
        });
    });

    it('test deleteAlias', function(done) {

        client.deleteAlias('alias2', null, function(err, res) {
            if (!err && res) {
                should(res).be.ok;
                done();
            }
        });
    });
});