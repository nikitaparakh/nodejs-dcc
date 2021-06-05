var http = require("http");
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

   var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WT"
});

app.get('/main', function(req, res){
    res.sendFile(__dirname + '/main.html');
  });

  app.post('/user', function(req, res){
    res.sendFile(__dirname + '/user.html');
  });

 app.post('/login', function(req, res){
    res.sendFile(__dirname + '/login.html');
  });

  app.post('/save', urlencodedParser, function (req, res){
  
    n =req.body.name;
    a= req.body.Password;
    
  
    var sql =" insert into user values('"+n+"','"+a+"')";
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
 
  con.query(sql, function (err, result) {
   if (err) throw err; 
    console.log("inserted");
   });
  
  res.sendFile(__dirname + '/search.html');
  
  });

  app.post('/asave', urlencodedParser, function (req, res){
  
    nn =req.body.aname;
    aa= req.body.aPassword;
    
  
    var sql =" insert into admin values('"+nn+"','"+aa+"')";
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/
 
  con.query(sql, function (err, result) {
   if (err) throw err; 
    console.log("inserted");
   });
   
  
  
  
  res.sendFile(__dirname + '/Admin.html');
  
  });

 
app.post('/search1', urlencodedParser, function (req, res){
   console.log("hello");
    Bookfound=req.body.bookname;
    
   
   console.log(Bookfound);
   var sql="select * from Book where name='"+Bookfound+"' ";
 /* con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/
  
  con.query(sql, function (err, result,fields) {
   if (err) throw err;
   var i=0;
   console.log(result.length+" Books are available"); 
   console.log(result);
   if(result.length>0){
   var rr="<html>";
   rr=rr+"<head>";
   rr=rr+"<title>";
   rr=rr+"Search";
   rr=rr+"</title>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:grey;}";
   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr= rr+"<h1>";
    rr= rr+result.length;
    rr = rr+" Book found";
    rr = rr+"</h1>"
    rr = rr+"Book details are:";
    for(i=0;i<result.length;i++)
  {
    rr = rr+"<br>";
    rr = rr+"Name:";
    rr = rr+result[i].Name;
    rr = rr+"<br>";
    rr = rr+"Pages:";
    rr = rr+result[i].Pages;
    rr = rr+"<br>";
    
  
  }
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   }
   else{
    var rr="<html>";
    rr=rr+"<head>";
   rr=rr+"<title>";
   rr=rr+"Search";
   rr=rr+"</title>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:plum;}";
   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr= rr+"<h1>";
    rr = rr+"No Books found";
    rr = rr+"</h1>"
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   }
   
    
   });
  
   });

   app.post('/delete', urlencodedParser, function (req, res){
    delname=req.body.deltext;
   console.log(delname);
   
   var sql="delete from Book where Name='"+delname+"'";
  
  
  con.query(sql, function (err, result,fields) {
   if (err) throw err;
   
   console.log(result);
   console.log(result.affectedRows);
   if(result.affectedRows>0)
   {
    var rr="<html>";
    rr=rr+"<head>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:grey;}";
   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr= rr+"<h1>";
    rr= rr+result.affectedRows;
    rr = rr+" Book deleted";
    rr = rr+"</h1>"
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   }
   else{
    var rr="<html>";
    rr=rr+"<head>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:grey;}";
   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr= rr+"<h1>";
    rr = rr+"No Book is deleted";
    rr = rr+"</h1>"
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   }
    
   });
  
   });


   app.post('/insert', urlencodedParser, function (req, res){
    inbook=req.body.intext;
    inpages=req.body.inpag;
   
   
  
   var sql =" insert into book values('"+inbook+"','"+inpages+"')";
  
  con.query(sql, function (err, result,fields) {
   if (err) throw err;
   
   console.log(result);
   
    var rr="<html>";
    rr=rr+"<head>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:grey;}";
   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr= rr+"<h1>";
    rr= rr+inbook;
    rr = rr+" Book Inserted";
    rr = rr+"</h1>"
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   

    
   });
  
   });

   app.post('/Books', urlencodedParser, function (req, res){
    
   var sql="select * from book";

con.query(sql, function (err, result,fields) {
   if (err) throw err;
   var i=0;
   console.log(" Books available are"); 
   console.log(result);
   if(result.length>0){
   var rr="<html>";
   rr=rr+"<head>";
   rr=rr+"<title>";
   rr=rr+"Search";
   rr=rr+"</title>";
    rr=rr+"<style>";
   rr=rr+"body{background-color:grey;}";

   rr=rr+"</style>";
   rr=rr+"</head>";
    rr = rr+"<body>";
    rr=rr+"<h1>"
    rr = rr+"Book available are:";
    rr=rr+"</h1>"
    /*rr=rr+"<table>"
    rr=rr+"<tr>"
        rr=rr+"<th> BookName</td>"
        rr=rr+"<th>Pages</th>"
        rr=rr+"</tr>"*/
    rr=rr+"</table"
    for(i=0;i<result.length;i++)
  {
    rr = rr+"<br>";
    rr = rr+"Name:";
    rr = rr+result[i].Name;
    rr = rr+"<br>";
    rr = rr+"Pages:";
    rr = rr+result[i].Pages;
    rr = rr+"<br>";
    
  
  }
  
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
   }
  });
});
   app.listen(8000, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", 8000);
  }
  )