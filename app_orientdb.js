var express = require('express');
var bodyParser = require('body-parser');
var OrientDB = require('orientjs');
var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'zzong91'
});
var db = server.use('o2');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views', './views_orientdb');
app.set('view engine', 'jade');

app.get('/upload', function(req, res){
  res.render('upload');
});

app.get('/topic/add', function(req, res){
  var sql = 'Select * From topic';
  db.query(sql).then(function(topics){
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
  var sql = 'Insert Into topic (title, description, author) Values(:title, :desc, :author)';
  var param = {
    params:{
      title:title,
      desc:description,
      author:author
    }
  };
  db.query(sql, param).then(function(results){
    res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
  });
});

app.get('/topic/:id/edit', function(req, res){
  var sql = 'Select * From topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'Select From topic Where @rid=:rid';
    db.query(sql, {params:{rid:id}}).then(function(topic){
      res.render('edit', {topics:topics, topic:topic[0]});
    });
  });
});

app.post('/topic/:id/edit', function(req, res){
  var rid = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'Update topic Set title=:t, description=:d, author=:a Where @rid=:rid';
  var param = {
    params:{
      rid:rid,
      t:title,
      d:description,
      a:author
    }
  };
  db.query(sql, param).then(function(topics){
    res.redirect('/topic/'+encodeURIComponent(rid));
  });
});

app.get('/topic/:id/delete', function(req, res){
  var sql = 'Select * From topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'Select From topic Where @rid=:rid';
    db.query(sql, {params:{rid:id}}).then(function(topic){
      res.render('delete', {topics:topics, topic:topic[0]});
    });
  });
});

app.post('/topic/:id/delete', function(req, res){
  var sql ='Delete From topic Where @rid=:rid'
  var id = req.params.id;
  var param = {
    params:{
      rid:id
    }
  };
  db.query(sql, param).then(function(results){
    res.redirect('/topic/');
  });
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'Select * From topic';
  db.query(sql).then(function(topics){
  var id = req.params.id;
    if(id){
        var sql = 'Select From topic Where @rid=:rid';
        db.query(sql, {params:{rid:id}}).then(function(topic){
          res.render('view', {topics:topics, topic:topic[0]});
        });
    } else{
        res.render('view', {topics:topics});
    }
  });
});

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
