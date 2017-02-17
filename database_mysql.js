var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'node',
  password : 'zzong91',
  database : 'o2'
});
conn.connect();

/*var sql = 'Select * From topic';
conn.query(sql, function (err, rows, fields) {
  if (err){
    console.log(err);
  } else{
    for(var i=0; i<rows.length; i++){
      console.log(rows[i].title);
    }
  }
});*/

/*var sql = 'Insert Into topic (title, description, author) Values(?,?,?)';
var params = ['Supervisor', 'Watcher', 'Graphittie'];
conn.query(sql, params, function (err, rows, fields) {
  if (err){
    console.log(err);
  } else{
    console.log(rows.insertId); //rows.insertId => 유용할듯
  }
});*/

/*var sql = 'Update topic Set title=?, description=? Where id=?';
var params = ['NPM', 'NPM is Manager', 1];
conn.query(sql, params, function (err, rows, fields) {
  if (err){
    console.log(err);
  } else{
    console.log(rows); //rows.insertId => 유용할듯
  }
});*/

var sql = 'Delete From topic Where id=?';
var params = [1];
conn.query(sql, params, function (err, rows, fields) {
  if (err){
    console.log(err);
  } else{
    console.log(rows); //rows.insertId => 유용할듯
  }
});

conn.end();
