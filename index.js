var request = require('request');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cheerio = require('cheerio');

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/news', function(req, res) {
    date = req.query.date;
    request('http://toutiao.io/prev/' + date, function(error, response, body) {
        res.setHeader("Content-Type", "text/html");
        res.end(body)
    })
});

app.get('/lizx', function(req, res) {
    request('http://www.lindiankanshu.com/0_619/', function(error, response, body) {
        //var result=body.toString();
        var $ = cheerio.load(body);
        var array = [];
        var link = $("#list").html();
        res.json({
            "list": link
        });
    })
});

app.post('/details', function(req, res) {
    var link = req.body.query;
    console.log(req.body.query)
    request('http://www.lindiankanshu.com'+link, function(error, response, body) {
        var obj = {};
        var $ = cheerio.load(body);
        obj['title'] = $('.bookname h1').text();
        obj['content'] = $("#content").html();
        res.json(obj);
    })
});


app.listen(1337, '127.0.0.1');
