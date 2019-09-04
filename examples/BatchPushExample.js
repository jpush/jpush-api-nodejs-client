var JPush = require("../index.js").JPush;
var Conf = require("./Conf.js");

console.log(Conf.appKey);
console.log(Conf.masterSecret);
var client = JPush.buildClient(Conf.appKey, Conf.masterSecret);
console.log(client.appkey);
console.log(client.masterSecret);

var singlePayloads = [
  {"platform":"all", "target":"regid1", "notification":{"alert":"alert title"}},
  {"platform":"all", "target":"regid2", "notification":{"alert":"alert title"}},
];

client.batchPushByRegid(singlePayloads, function(err, res) {
  console.log(err);
  console.log(res);
});
