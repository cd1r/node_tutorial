var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'zzong91'
});

var db = server.use('o2')
//console.log('Using Database:' + db.name);
/*var rec = db.record.get('#22:0').then(function(record) {
  console.log('Loaded Record:', record);
});*/

//Create, Read, Update, Delete => CRUD

//Read
/*var sql = 'Select * From topic';
db.query(sql).then(function(results){
  console.log(results);
})*/

//Read
/*var sql = 'Select * From topic Where @rid=:rid';
var param = {
  params:{ //params는 약속된 객체임
    rid:'#22:0'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
})*/

//Create
/*var sql = "Insert Into topic (title, description) Values(:title, :desc)";
var param = {
  params:{
    title:'Express',
    desc:'Express is framework for web'
  }
}
db.query(sql, param).then(function (results) {
  console.log(results); //삽입한 객체가 출력됨
})*/

//Update
/*var sql = "Update topic Set title=:title Where @rid=:rid";
db.query(sql, {params:{title:'Expressjs', rid:'#21:1'}}).then(function(results){
  console.log(results); //몇 개의 행이 수정됐는지 출력
})*/

//Delete
/*var sql = "Delete From topic Where @rid=:rid";
db.query(sql, {params:{rid:'#21:1'}}).then(function(results){
  console.log(results); //몇 개의 행이 삭제됐는지 출력
})*/
