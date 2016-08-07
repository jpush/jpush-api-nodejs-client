var should = require('should')
var JPush = require('../index')
var Base = require('./BaseTest')

describe('report received test1', function () {
  var client
  this.timeout(30000)
  before(function () {
    client = JPush.buildClient(Base.appKey, Base.masterSecret)
  })
  after(function () {})

  it('report received test1', function (done) {
    client.getReportReceiveds('1083691241', function (err, res) {
      if (!err && res) {
        res.length.should.equal(1)
        done()
      }
    })
  })
  it('report received test2', function (done) {
    client.getReportReceiveds('1083691241,', function (err, res) {
      if (!err && res) {
        res.length.should.equal(2)
        done()
      }
    })
  })
  it('report received test3', function (done) {
    client.getReportReceiveds('1083691241,2023215321', function (err, res) {
      if (!err && res) {
        res.length.should.equal(2)
        done()
      }
    })
  })

  it('report messages test1', function (done) {
    client.getReportMessages('1083691241', function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })
  it('report messages test2', function (done) {
    client.getReportMessages('1083691241,', function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })
  it('report messages test3', function (done) {
    client.getReportMessages('1083691241,2023215321', function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })

  it('report users test1', function (done) {
    client.getReportUsers('MONTH', '2014-05', 2, function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })
  it('report users test2', function (done) {
    client.getReportUsers('DAY', '2014-05-10', 5, function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })
  it('report users test3', function (done) {
    client.getReportUsers('HOUR', '2014-05-10 06', 10, function (err, res) {
      if (!err && res) {
        done()
      }
    })
  })
})
