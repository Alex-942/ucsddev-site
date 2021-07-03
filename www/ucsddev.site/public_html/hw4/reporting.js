
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require('mysql');


const connection = mysql.createConnection({
  user : 'andrew',
  password : 'lckon0hpoyyb6z4m',
  host : 'db-mysql-sfo2-35086-do-user-9022740-0.b.db.ondigitalocean.com',
  port : 25060,
  database : 'defaultdb'
  });

connection.connect((err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!')
});
app.set('views', '/var/www/ucsddev.site/public_html/hw4/public/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));

app.get('/',function(req,res){
  var title = "PERFORMANCE OVERVIEW" ;
  res.render('login.ejs') ;
});


app.listen(2000, function() {
    console.log("Port 2000 is connected");
  });