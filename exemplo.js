var express = require('express');
var session = require('express-session');
var app = express();

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', function (req, res) {
	  if (req.session.count) {
		req.session.count++
		res.setHeader('Content-Type', 'text/html')
		res.write('<p>Contador: ' + req.session.count + '</p>')
		res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
		res.end()
	  } else {
		req.session.count = 1
		res.end('welcome to the session demo. refresh!')
	  }
});


app.get('/count', function (req, res) {
  if (req.session.count) {
    req.session.count++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Contador: ' + req.session.count + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    res.end('no session demo, go to root!')
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//req.session.destroy();
