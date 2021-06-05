var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WT"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

 var sql = "CREATE TABLE Book(Name  varchar(30),Pages integer(3))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  var sql = "CREATE TABLE admin(name  varchar(30), password varchar(30))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});



