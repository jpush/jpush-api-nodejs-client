var JPush = require("../index.js").JPushAsync;
var Conf = require("./Conf.js");

var client = JPush.buildClient(Conf.appKey, Conf.masterSecret);

async function fun() {
    try {
        var re = await client.getTagList()
        console.log(re)
    } catch (err) {
        console.log(err)
    }
}
fun()

client.getTagList()
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    })

client.getDeviceTagAlias('0900e8d85ef')
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    })

async function getDeviceStatus() {
    const resp = await client.getDeviceStatus(['171976fa8a8085fcdba']);
    if (resp.err) {
        console.log(resp.err.message)
    } else {
        console.log(resp.res);
    }
}
getDeviceStatus();
