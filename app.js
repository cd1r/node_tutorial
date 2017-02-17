var express = require('express');
var bodyParser = require('body-parser'); //post 객체 파싱하는 미들웨어
var app = express(); //express라는 함수가 app을 리턴함

app.locals.pretty = true;
//jade를 express에 연동하는 부분
app.set('view engine', 'jade');
app.set('views', './views');

//정적인 파일을 제공해줄때 필요
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({extended:false}));

app.get('/form', function(req, res){
  res.render('form');
})

app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ', ' + description);
})

app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ', ' + description);
})

//Semantic URL
app.get('/topic/:id/:mode', function(req, res){
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">NodeJs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id] + req.params.mode}
    `
  res.send(output);
})

//Query URL
/*app.get('/topic', function(req, res){
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">NodeJs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
    `
  res.send(output);
})*/

//jade 관련 코드
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title_:'This is Title'});
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/img', function(req, res){
  res.send('<h1>Hello Img</h1>, <img src="/10.png">');
});

app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }

  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello Dynamic!
      <ul>
        ${lis}
      </ul>
    </body>
  </html>`
  res.send(output);
})
