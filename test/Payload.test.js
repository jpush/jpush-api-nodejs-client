/**
 * Created by 泽帆 on 2014/5/29 0029.
 */

var should = require('should');
var JPush = require('../index');

describe('Payload test', function() {

    it('test init Payload', function(done) {
        var json = {
            platform : 'all',
            audience : 'all'
        };
        var result = JSON.stringify(json);

        var payload = JPush.buildPayload();
        payload.toJSON().should.equal(result);
        done();
    })

    it("test set setPayload", function(done) {
        var json = {
            platform : ['ios', 'android'],
            audience : {
                tag : ['tag1', 'tag2'],
                tag_and : ['tag3', 'tag4'],
                alias : ['alias1', 'alias2'],
                registration_id : ['id1', 'id2']
            },
            options : {
                sendno : 12345,
                time_to_live : 60,
                override_msg_id : 12345,
                apns_production : false
            },
            message :  {
                msg_content : 'mes content',
                title : 'msg title',
                content_type : 'msg content type',
                extras : {"key1": "value1", "key2": "value2"}
            },
            notification : {
                alert : 'notification alert',
                android : {
                    alert : 'android alert',
                    title : 'android title',
                    builder_id : 0,
                    extras : {"key1": "value1", "key2": "value2"}
                },
                ios : {
                    alert : 'ios alert',
                    sound : 'happy',
                    badge : 1,
                    'content-available' : 1,
                    extras : {"key1": "value1", "key2": "value2"}
                },
                winphone : {
                    alert : 'winphone alert',
                    title : 'winphone title',
                    _open_page : '/friends.xaml',
                    extras : {"key1": "value1", "key2": "value2"}
                }
            }
        };
        var result = JSON.stringify(json);
        var payload = JPush.buildPayload();
        payload.setPlatform(["ios","android"]);
        payload.setAudience({
            tag : ["tag1", "tag2"],
            tag_and : ["tag3", "tag4"],
            alias : ["alias1", "alias2"],
            registration_id : ["id1", "id2"]
        });
        payload.setOptions({
            sendno : 12345,
            time_to_live : 60,
            override_msg_id : 12345,
            apns_production : false
        });
        payload.setMessage({
            msg_content : 'mes content',
            title : 'msg title',
            content_type : 'msg content type',
            extras : {key1 : 'value1', 'key2' : "value2"}
        });
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
        payload.toJSON().should.equal(result);
        done();
    })

    it('test set Payload by options', function(done) {
        var json = {
            platform : ['ios', 'android'],
            audience : {
                tag : ['tag1', 'tag2'],
                tag_and : ['tag3', 'tag4'],
                alias : ['alias1', 'alias2'],
                registration_id : ['id1', 'id2']
            },
            options : {
                sendno : 12345,
                time_to_live : 60,
                override_msg_id : 12345,
                apns_production : false
            },
            message :  {
                msg_content : 'mes content',
                title : 'msg title',
                content_type : 'msg content type',
                extras : {"key1": "value1", "key2": "value2"}
            },
            notification : {
                alert : 'notification alert',
                android : {
                    alert : 'android alert',
                    title : 'android title',
                    builder_id : 0,
                    extras : {"key1": "value1", "key2": "value2"}
                },
                ios : {
                    alert : 'ios alert',
                    sound : 'happy',
                    badge : 1,
                    'content-available' : 1,
                    extras : {"key1": "value1", "key2": "value2"}
                },
                winphone : {
                    alert : 'winphone alert',
                    title : 'winphone title',
                    _open_page : '/friends.xaml',
                    extras : {"key1": "value1", "key2": "value2"}
                }
            }
        };
        var result = JSON.stringify(json);

        var payload = JPush.buildPayload(json);
        payload.toJSON().should.equal(result);
        done();
    })
});