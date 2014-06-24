var JPush = require("../lib/JPush/JPush.js");

var client = JPush.buildClient('47a3ddda34b2602fa9e17c01', 'd94f733358cca97b18b2cb98');
var tooBig = '这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。这款Signature Touch手机的价格约合人民币12万元，相信能买得起它的，应该都不会很在意参数，但即便如此，Vertu依然做的很到位，其配备的是4.7英寸1080p蓝宝石屏，搭载骁龙801处理器和2GB RAM，提供64GB存储空间和2275mAh电池。';


//easy push
client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.ALL)
    .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log(err.message);
            } else if (err instanceof  JPush.APIRequestError) {
                console.log(err.message);
            }
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });

//full push
client.push().setPlatform('ios', 'android')
    .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
    .setMessage('msg content')
    .setOptions(null, 60)
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log(err.message);
            } else if (err instanceof  JPush.APIRequestError) {
                console.log(err.message);
            }
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });




