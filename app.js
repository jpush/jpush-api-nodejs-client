var JPush = require('./index');

//构建Payload推送对象，参数options
var appkey = '47a3ddda34b2602fa9e17c01';
var masterSecret = 'd94f733358cca97b18b2cb98';
var client = JPush.buildClient({appkey : appkey, masterSecret:masterSecret});

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
    apns_production : 1
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

//hehe
payload = JPush.buildPayload({
    options : {
        sendno : 12345
    }
});
payload.alertAll("Hello, JPush");
payload.setAudience({
    tag : ['555', '666']
});

console.log(payload.toJSON());
/*
client.sendPush(payload, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});
*/

client.getReport("510185290", function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});




/*
payload.setPlatform(["ios","android"]);
payload.setAudience({
        tag:["tag1", "tag2"],
        tag_and:["tag3", "tag4"]}
);
payload.setAudience({
    tag:["tag1", "tag2"],
    tag_and:["tag3", "tag4"]}
);
payload.alertAll("Hello, Jpush");

payload.setOptions({time_to_live:60});
payload.setAndroidNotification({
    alert : 'android alert'
});

//构建JPUSH客户端
var client = JPush.buildClient({appKey:"47a3ddda34b2602fa9e17c01", masterSecret:"d94f733358cca97b18b2cb98"});
client.sendPush(payload, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

client.getReport("837477020,1374362852", function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
})

console.log(payload.toJSON());
*/