/**
 * Created by 松松 on 13-11-25.
 */

var app = require('app')
var crypto = require('crypto')
var XmlStream = require('xml-stream');

app.get('/weixin/echo-token.io', function (req, res) {

    console.log('微信 query:', req.query)
    console.log('微信 body:', req.body)

    var $token = 'sjplus2013011025'

    var arr = [  $token, req.query.timestamp  , req.query.nonce ].sort()

    var shasum = crypto.createHash('sha1');
    shasum.update(arr.join(''))

    if (shasum.digest('hex') === req.query.signature) {
        res.end(req.query.echostr);
    } else {
        res.end(req.query.signature);
    }
})


app.post('/weixin/echo-token.io', function (req, res) {
    console.log('query', req.query)
    console.log('body', req.body)
    req.setEncoding('utf8');
    var xml = new XmlStream(req);

    xml.on('updateElement: sometag', function (element) {
        // DO some processing on the tag
    });

    xml.on('end', function () {
        console.log('Parse End')
        console.log(xml.data)
    });

})