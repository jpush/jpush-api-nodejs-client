var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');

describe('PushPayload test', function() {
    var client;
    before(function () {
        client = JPush.buildClient(Base.appKey, Base.masterSecret);
    });
    after(function () {});

    it('platform test1', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            platform : 'all'
        };
        var result = JSON.stringify(json);

        var payload = client.push().setPlatform(JPush.ALL).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('platform test2', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            platform : ['ios', 'winphone']
        };
        var result = JSON.stringify(json);

        var payload = client.push().setPlatform('ios', 'winphone').setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('platform test3', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            platform : ['ios', 'winphone']
        };
        var result = JSON.stringify(json);

        var payload = client.push().setPlatform(['ios', 'winphone']).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('audience test1', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            audience : 'all'
        };
        var result = JSON.stringify(json);

        var payload = client.push().setAudience(JPush.ALL).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();

    });

    it('audience test2', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            audience : {
                registration_id : ['id1', 'id2'],
                alias : ['alias1', 'alias2'],
                tag_and : ['tag3', 'tag4'],
                tag : ['tag1', 'tag2']
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setAudience(
            JPush.tag('tag1', 'tag2'),
            JPush.tag_and('tag3', 'tag4'),
            JPush.alias('alias1', 'alias2'),
            JPush.registration_id('id1', 'id2')
        ).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();

    });

    it('audience test2', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            audience : {
                registration_id : ['id1', 'id2'],
                alias : ['alias1', 'alias2'],
                tag_and : ['tag3', 'tag4'],
                tag : ['tag1', 'tag2']
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setAudience(
            JPush.tag('tag1,tag2'),
            JPush.tag_and('tag3,tag4'),
            JPush.alias('alias1,alias2'),
            JPush.registration_id('id1,id2')
        ).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();

    });

    it('message test1', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            message : {
                msg_content : 'msg content'
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setMessage('msg content').setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('message test2', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            message : {
                msg_content : 'msg content',
                title : 'msg title',
                content_type : 'content type',
                extras : Base.EXTRAS
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setMessage('msg content', 'msg title', 'content type', Base.EXTRAS).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('options test1', function(done) {
        var json = {
            options : {
                sendno : 123456,
                time_to_live : 60,
                override_msg_id : 654321,
                apns_production : true
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setOptions(123456, 60 ,654321, true);
        payload.toJSON().should.equal(result);
        done();
    });

    it ('notification test1', function(done) {
       var json = {
           options : {
               sendno : 123456,
               apns_production : false
           },
           notification : {
               alert: Base.ALERT
           }
       };
        var result = JSON.stringify(json);

        var payload = client.push().setNotification(Base.ALERT).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it ('notification test2', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            notification : {
                ios : {
                    alert : Base.ALERT,
                    sound : 'happy',
                    badge : 5
                },
                alert: Base.ALERT
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setNotification(Base.ALERT, JPush.ios(Base.ALERT, 'happy', 5)).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });

    it('notification test3', function(done) {
        var json = {
            options : {
                sendno : 123456,
                apns_production : false
            },
            notification : {
                winphone : {
                    alert : Base.ALERT,
                    title : Base.TITLE,
                    _open_page : 'open page',
                    extras : Base.EXTRAS
                },
                android : {
                    alert : Base.ALERT,
                    title : Base.TITLE,
                    builder_id : 1,
                    extras : Base.EXTRAS
                },
                ios : {
                    alert : Base.ALERT,
                    sound : 'happy',
                    badge : 2,
                    'content-available' : 1,
                    extras : Base.EXTRAS
                },
                alert: Base.ALERT
            }
        };
        var result = JSON.stringify(json);

        var payload = client.push().setNotification(
            Base.ALERT, JPush.ios(Base.ALERT, 'happy', 2, true, Base.EXTRAS),
            JPush.android(Base.ALERT, Base.TITLE, 1, Base.EXTRAS),
            JPush.winphone(Base.ALERT, Base.TITLE, 'open page', Base.EXTRAS)
        ).setOptions(123456);
        payload.toJSON().should.equal(result);
        done();
    });


    it ("ios length validate fail test", function(done) {
        var isVaildate = client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification(JPush.ios(Base.tooBig220))
            .isIosExceedLength();

       isVaildate.should.equal(false);
       done();
    });

    it ("ios length validate success test", function(done) {
        var isVaildate = client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification(JPush.ios(Base.ALERT))
            .isIosExceedLength();

        isVaildate.should.equal(true);
        done();
    });
    it ("ios length validate fail1 test", function(done) {
        var isVaildate = client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification(JPush.ios(Base.tooBig220))
            .isGlobalExceedLength();

        isVaildate.should.equal(false);
        done();
    });
    it ("ios length validate fail2 test", function(done) {
        var isVaildate = client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification(Base.tooBig1200, JPush.ios(Base.ALERT))
            .isGlobalExceedLength();

        isVaildate.should.equal(false);
        done();
    });
    it ("ios length validate success test", function(done) {
        var isVaildate = client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification(Base.ALERT, JPush.ios(Base.ALERT))
            .isGlobalExceedLength();

        isVaildate.should.equal(true);
        done();
    });
});