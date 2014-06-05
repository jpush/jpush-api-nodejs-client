/**
 * Created by 泽帆 on 2014/5/30 0030.
 */

var JPush = require('../index');

var appkey = 'your appkey';
var masterSecret = 'your masterSecret';
var client = JPush.buildClient({appkey : appkey, masterSecret:masterSecret});

//easy push
var payload = JPush.buildPayload({
    options : {
        sendno : 123456
    }
});
payload.alertAll("Hi, JPush");
client.sendPush(payload, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

//full push
var payload2 = JPush.buildPayload();
payload2.alertAll("Hi, JPush");
payload2.setPlatform(["ios","android"]);
payload2.setAudience({
    tag : ["555", "666"]
});
payload2.setOptions({
    sendno : 12345,
    time_to_live : 60,
    apns_production : 1
});
payload2.setMessage({
    msg_content : 'mes content',
    title : 'msg title',
    content_type : 'msg content type',
    extras : {key1 : 'value1', 'key2' : "value2"}
});
payload2.setNotification({
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
client.sendPush(payload2, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

//push with options
var options = {
    platform : ["ios","android"],
    audience : {
        tag : ["555", "666"]
    },
    options : {
        sendno : 12345,
        time_to_live : 60,
        apns_production : 1
    },
    message : {
        msg_content : 'mes content',
        title : 'msg title',
        content_type : 'msg content type',
        extras : {key1 : 'value1', 'key2' : "value2"}
    },
    notification : {
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
    }
};
var payload3 = JPush.buildPayload(options);
client.sendPush(payload3, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});
