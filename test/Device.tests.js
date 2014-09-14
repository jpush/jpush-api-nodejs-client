var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');
var assert = require('assert');
describe('device test', function() {
    this.timeout(30000);
    var client;
    before(function() {
        client = JPush.buildClient(Base.appKey, Base.masterSecret);
    });
    after(function() {
    });

/*    it('test updateDeviceTagAlias', function(done) {

        tagsToAdd = [ 'tag1', 'tag2' ];
        tagsToRemove = [ 'tag3', 'tag4' ];
        client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd,
                tagsToRemove, function(err, res) {
                    if (!err && res) {
                        assert.equal(res, 200, 'response error')
                        done();
                    }
                });
    });

    

    it('test getTagList', function(done) {

        client.getTagList(function(err, res) {
            console.log('got result' + res.tags)
            if (!err && res) {
                assert.ok(res.tags.length > 0, 'response error')
                done();
            }
        });
    });

    it('test isDeviceInTag', function(done) {

        client.isDeviceInTag('tag6', '0900e8d85ef', function(err, res) {
            if (!err && res) {
                console.log('asdasdasdasdasd' + res)
                assert.equal(res['result'], false, 'response error')
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
                        assert.equal(res, 200, 'response error')
                        done();
                    }
                });
    });

    it('test deleteTag', function(done) {

        client.deleteTag('tag4', null, function(err, res) {
            if (!err && res) {
                assert.equal(res, 200, 'response error')
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
                assert.equal(res, 200, 'response error')
                done();
            }
        });
    });
    
    it('test updateDeviceTagAlias', function(done) {

        tagsToAdd = [ 'tag1', 'tag2' ];
        tagsToRemove = [ 'tag3', 'tag4' ];
        client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd,
                tagsToRemove, function(err, res) {
                    if (!err && res) {
                        assert.equal(res, 200, 'response error')
                        done();
                    }
                });
    });*/
    
    it('test getDeviceTagAlias', function(done) {
        client.getDeviceTagAlias('0900e8d85ef', function(err, res) {
            if (err) {
                if (err instanceof JPush.APIConnectionError) {
                    console.log(err.message);
                } else if (err instanceof JPush.APIRequestError) {
                    console.log(err.message);
                }
            } else {
              tag = ["tag1","tag2"];
              assert.equal(res.tags.sort().toString(), tag.sort().toString(), 'response error')
                done();
            }
        });
    });
});