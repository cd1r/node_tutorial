var express = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'node',
  password : 'zzong91',
  database : 'o2'
});
conn.connect();
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/upload', function(req, res){
  res.render('upload');
});

app.get('/topic/add', function(req, res){
  var sql = 'Select * From topic';
  conn.query(sql, function(err, topics, fields){
    if(topics.length == 0){
      console.log("There is no data");
      res.status(500).send('Internal Server Error');
    }
    res.render('add', {topics:topics});
  });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'Insert Into topic (title, description, author) Values(?,?,?)';
  conn.query(sql, [title, description, author], function(err, result, fields){
    res.redirect('/topic/' + result.insertId);
  });
});

app.get('/topic/:id/edit', function(req, res){
  var sql = 'Select * From topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics, fields){
    var sql = 'Select * From topic Where id=?';
    conn.query(sql, [id], function(err, topic, fields){
      res.render('edit', {topics:topics, topic:topic[0]});
    });
  });
});

app.post('/topic/:id/edit', function(req, res){
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'Update topic Set title=?, description=?, author=? Where id=?';
  conn.query(sql, [title, description, author, id], function(err, result, fields){
    res.redirect('/topic/'+id);
  });
});

app.get('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql = 'Select * From topic';
  conn.query(sql, function(err, topics, fields){
    var sql = 'Select * From topic Where id=?';
    conn.query(sql, [id], function(err, topic, fields){
      res.render('delete', {topics:topics, topic:topic[0]});
    });
  });
});

app.post('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql ='Delete From topic Where id=?'
  conn.query(sql, [id], function(){
    res.redirect('/topic/');
  });
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'Select * From topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(id){
      var sql = 'Select * From topic Where id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          console.log(err);
        } else {
          res.render('view', {topics:topics, topic:topic[0]});
        }
      });
    } else{
      res.render('view', {topics:topics});
    }
  });
});

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
