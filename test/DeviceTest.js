var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');
var assert = require('assert');

var client = JPush.buildClient('dd1066407b044738b6479275', '6b135be0037a5c1e693c3dfa');
var oneSecond = 800;

var tagsToAdd = [ 'tag1', 'tag2' ];
var tagsToRemove = [ 'tag3', 'tag4' ];
client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd,
        tagsToRemove, function(err, res) {
            if (!err && res) {
                assert.equal(res, 200, 'response error')

            }
        });

setTimeout(function() {
    client.getTagList(function(err, res) {
        console.log('got result' + res.tags)
        if (!err && res) {
            assert.ok(res.tags.length > 0, 'response error')

        }
    })
}, oneSecond);

setTimeout(function() {
client.getAliasDeviceList('alias1', null, function(err, res) {
    if (!err && res) {
        assert.ok(res.registration_ids[0] == '0900e8d85ef', 'response error')

    }
}) }, oneSecond * 2);

setTimeout(function() {
var toAddUsers = [ '0900e8d85ef' ];
var toRemoveUsers = [ '0a04ad7d8b4' ];
client.addRemoveDevicesFromTag('tag4', toAddUsers, toRemoveUsers, function(err,
        res) {
    if (!err && res) {
        assert.equal(res, 200, 'response error')

    }
}) }, oneSecond * 3);

setTimeout(function() {
client.isDeviceInTag('tag4', '0900e8d85ef', function(err, res) {
    if (!err && res) {
        console.log('got result' + res)
        assert.equal(res['result'], true, 'response error')

    }
}) }, oneSecond * 4);

setTimeout(function() {
client.isDeviceInTag('tag4', '0a04ad7d8b4', function(err, res) {
    if (!err && res) {
        console.log('got result' + res)
        assert.equal(res['result'], false, 'response error')

    }
}) }, oneSecond * 5);

setTimeout(function() {
client.getTagList(function(err, res) {
    console.log('got resultasdasdasd' + res.tags)
    if (!err && res) {
        assert.ok(res.tags[0] != undefined, 'response error')

    }
})  }, oneSecond * 6);

setTimeout(function() {
client.deleteTag('tag4', null, function(err, res) {
    if (!err && res) {
        assert.equal(res, 200, 'response error')

    }
}) }, oneSecond * 7);

setTimeout(function() {
client.getAliasDeviceList('alias1', null, function(err, res) {
    if (!err && res) {
        assert.ok(res.registration_ids != undefined, 'response error')

    }
}) }, oneSecond * 8);

setTimeout(function() {
client.deleteAlias('alias2', null, function(err, res) {
    if (!err && res) {
        assert.equal(res, 200, 'response error')

    }
}) }, oneSecond * 9);

setTimeout(function() {
var tagsToAdd = [ 'tag1', 'tag2' ];
var tagsToRemove = [ 'tag3', 'tag4' ];
client.updateDeviceTagAlias('0900e8d85ef', 'alias1', false, tagsToAdd,
        tagsToRemove, function(err, res) {
            if (!err && res) {
                assert.equal(res, 200, 'response error')

            }
        }) }, oneSecond * 10);

setTimeout(function() {
client.getDeviceTagAlias('0900e8d85ef', function(err, res) {
    if (err) {
        if (err instanceof JPush.APIConnectionError) {
            console.log(err.message);
        } else if (err instanceof JPush.APIRequestError) {
            console.log(err.message);
        }
    } else {
        tag = ["555", "gggg", "tag1", "tag2"];
		console.log(res.tags.sort().toString());
        assert.equal(res.tags.sort().toString(), tag.sort().toString(),
                'response error')

    }
}) }, oneSecond * 11);
