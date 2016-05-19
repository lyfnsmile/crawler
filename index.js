var request=require('request');
var express=require('express');
var path = require('path');

var app=express();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/news',function(req,res){
	console.log(req.url)
	request('http://toutiao.io/prev/2016-05-19', function (error, response, body) {
		res.setHeader("Content-Type", "text/html");
     	res.end(body)
	})
})
app.listen(1337, '127.0.0.1');