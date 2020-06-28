var JPush = require("../index.js").JPushAsync;
var Conf = require("./Conf.js");

var client = JPush.buildClient(Conf.appKey, Conf.masterSecret);

async function getReportStatusMessage() {
  const data = await client.getReportStatusMessage(23223422, ['24243242']);
  if (data.err) {
    console.log(data.err);
  } else {
    console.log(data.res);
  }
 }
 getReportStatusMessage();
