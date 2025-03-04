
// ===== Request2 =====
var pkg = require('./../../package.json')
var debug = require('debug')('jpush')
/**
 * @param {JPushClient} client
 * @param {string} url
 * @param {import('http').RequestOptions} options
 * @param {(err, res, body) => void} callback
 */
module.exports = function Request2(client, url, options, callback) {
  const baseHeaders = {
    'Authorization': 'Basic ' + Buffer.from(client.appkey + ':' + client.masterSecret, 'utf8').toString('base64'),
    'User-Agent': 'JPush-API-NodeJS-Client ' + pkg.version,
    'Connection': 'Keep-Alive',
    'Charset': 'UTF-8',
    'Content-Type': 'application/json'
  };
  const { headers, body, ..._options } = options;
  if (client.isDebug) console.log(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    const myURL = new URL(client.proxy || url);
    const http = myURL.protocol === 'https:' ? require('https') : require('http');
    const req = http.request(
      {
        host: myURL.hostname,
        port: myURL.port,
        path: myURL.pathname,
        headers: { ...baseHeaders, ...headers },
        ..._options
      },
      resp => {
        resp.on('data', (res) => {
          if (res instanceof Buffer) {
            res = res.toString();
            if (resp.headers['content-type'].indexOf('application/json') > -1) res = JSON.parse(res);
          }
          if (client.isDebug) debug(res);
          resp.statusCode === 200 ? resolve(res) : reject(res);
          callback && callback(null, res, body);
        });
      }
    );
    req.on('error', (err) => {
      client.isDebug && debug(err);
      reject(err);
      callback && callback(err);
    });
    if (body) req.write(JSON.stringify(body), err => err && reject(err));
    req.end();
  });
}
