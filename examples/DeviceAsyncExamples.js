var JPush = require("../index.js").JPushAsync;

var client = JPush.buildClient('a1703c14b186a68a66ef86c1', '9dabdf8bb704b421759cb49c')

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
