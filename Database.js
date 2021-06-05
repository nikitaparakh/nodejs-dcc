var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql!");
  con.query("CREATE DATABASE WT;", function (err, result) {
    if (err) throw err;
    console.log("Database is created");
  });
});

