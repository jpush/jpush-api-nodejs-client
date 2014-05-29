var JPush = require('jpush-sdk');

//构建Payload推送对象，参数options
var payload = JPush.buildPayload({
    options : {
        sendno:123456
    }
});

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
    console.log(err);
    console.log(result);
});

client.getReport("837477020,1374362852", function(err, result) {
    console.log(err);
    console.log(result);
})

console.log(payload.toJSON());
