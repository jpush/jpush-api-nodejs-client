var should = require('should');
var JPush = require('../index');
var Base = require('./BaseTest');

describe('Push test', function() {
    var client;
    var timeStep = 5;
    var times = 1;

    before(function () {
        client = JPush.buildClient(Base.appKey, Base.masterSecret);
    });
    after(function () {});

    it('Alert all test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    it('Push platform test1', function(done) {
        setTimeout(function() {
            client.push().setPlatform('android')
                .setAudience(JPush.ALL)
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    it('Push platform test1', function(done) {
        setTimeout(function() {
            client.push().setPlatform('android', 'ios', 'winphone')
                .setAudience(JPush.ALL)
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    it('Push tags test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.tag(Base.TAG1))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);

    });
    it('Push tags more test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.tag(Base.TAG1, Base.TAG2))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push alias test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.alias(Base.ALIAS1))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push alias more test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.alias(Base.ALIAS1, Base.ALIAS2))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push tag_and test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.tag_and(Base.TAG1))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push tag_and more test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.tag_and(Base.TAG1, Base.TAG_ALL))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push registration_id test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.registration_id(Base.REGISTRATION_ID1))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push registration_id more test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.registration_id(Base.REGISTRATION_ID1, Base.REGISTRATION_ID2))
                .setNotification(Base.ALERT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });


    // notification
    it('Push android', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.android(Base.ALERT))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push android full', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.android(Base.ALERT, Base.TITLE, 1, Base.EXTRAS))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push ios', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.ios(Base.ALERT))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push ios full', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.ios(Base.ALERT, 'sound', 5, true, Base.EXTRAS))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push winphone', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.winphone(Base.ALERT))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });
    it('Push winphone full', function(done){
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(JPush.winphone(Base.ALERT, Base.TITLE, 'open page', Base.EXTRAS))
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    //message
    it ('Push message test', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setMessage(Base.MSG_CONTENT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    it ('Push message test2', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setMessage(Base.MSG_CONTENT, Base.TITLE, 'content type', Base.EXTRAS)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);
    });

    it ('Push notification and message', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(Base.ALERT)
                .setMessage(Base.MSG_CONTENT)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);

    });

    it ('Options test1', function(done) {
        setTimeout(function() {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification(Base.ALERT)
                .setOptions(123456, 60, null, true)
                .send(function(err, res) {
                    if (!err && res) {
                        done();
                    }
                });
        }, timeStep * times++);

    });

});