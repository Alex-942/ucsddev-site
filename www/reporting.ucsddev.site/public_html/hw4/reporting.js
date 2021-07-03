
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

const app = express();

const mysql = require('mysql');


var session = require('express-session');
app.use(session({
	secret: 'cse135',
	resave: true,
	saveUninitialized: true
}));


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
app.set('views', '/var/www/reporting.ucsddev.site/public_html/hw4/public/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname ));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
var key = 'passwd';

app.get('/',function(req,res){
  var title = "PERFORMANCE OVERVIEW" ;
  req.session.loggedin = false;
  req.session.username = '';
  req.session.admin = false;
  res.render('login.ejs') ;
});

app.get('/login', function(req,res){
  if (req.session.loggedin == true ){
    if(req.session.admin == true){
      res.render('index-admin.ejs', {session:req.session});
    }
    else{
      res.render('index-nonadmin.ejs', {session:req.session});
    }
  }
  else{
    res.render('login.ejs')
  }

});

app.post('/login',function(req,res){
  //username and email can be used interchangably
  var expected_hash = bcrypt.hashSync(`${req.body.password}`, 10);
  if(req.body.email == '' || req.body.password == '') res.render('login.ejs') ;
  console.log(expected_hash);
  console.log(req.body);
  connection.query(`SELECT * FROM Users WHERE (email = \'${req.body.email}\' or username = \'${req.body.email}\');`,function(err, results) {
    if (err) throw err
    //need to check admin status each user must have a unique username and email
    console.log(results);
    if (results.length != 0 && bcrypt.compareSync(req.body.password, results[0].password)){
      
      req.session.loggedin = true;
      req.session.admin = false;
			req.session.username = results[0][2];

      console.log(Number(results[0].admin));
      if(Number(results[0].admin) == 1){
        //admin
        console.log('admin');
        req.session.admin = true;
        res.render('index-admin.ejs', {session:req.session});

      }
      else{
        //not admin
      res.render('index-nonadmin.ejs', {session:req.session})
      }
    }
    else{
      console.log(results.length)
      
      console.log('you dont exist')
      res.render('login.ejs') ;
    }
  })
});


app.post('/sign_up', function(req, res){
  
  //password = "'" +String(req.body.passwordSignUp) +"'"
  connection.query(`SELECT * FROM Users WHERE email = \'${req.body.emailSignup}\' or username = \'${req.body.usernamesignUp}\';`, function(err, results) {
    console.log(req.body);
    if (err){
      console.log(err);
      throw err
    }
    
    if(results.length != 0){
      console.log("FOUND Account");
      for(let i = 0; i < results.length; i++){
        if(results[i].email == req.body.emailSignup){
          console.log("Email already has associated profile");
          break;
        }
        if(i == results.length - 1){
          console.log("username already being used");
	}
      }
      res.render('login.ejs') ;
      
    }

    else{
      let encryptedPassword = bcrypt.hashSync(`${req.body.passwordSignUp}`, 10);
      console.log(encryptedPassword);
      var str = `INSERT INTO Users (email, username, password, admin) VALUES ( \'${req.body.emailSignup}\' , \'${req.body.usernamesignUp}\' , \'${encryptedPassword}\' , 0);`;
      connection.query(str, function(error, results) {
        if(error){
          console.log(error);
          return res.status(500).json({ errors: { global: "Something went wrong" } });
        }
        //created
        
        req.session.loggedin = true;
        req.session.username = req.body.usernamesignUp;
        req.session.admin = false;
        res.render('index-nonadmin.ejs', {session:req.session}) ;
        
      });
    }
    
  })
});

app.get('/logout',function(req,res){
  req.session.loggedin = false;
  req.session.username = '';
  req.session.admin = false;
  res.render('logout.ejs', {session:req.session}) ;
});

app.get('/users',function(req,res){
  connection.query('SELECT * FROM Users ;',function(err, results) {
    if (err) throw err

    console.log(results)
    if(req.session.loggedin == true){
      if(req.session.admin == true){
        res.render('users.ejs', {session:req.session, users: results});
      }
      else{
        res.render('index-nonadmin.ejs', {session:req.session});
      }
      
    }
    else{
      res.render('login.ejs', {session:req.session})
    }
  });
});

app.get('/report',function(req,res){
  if(req.session.loggedin == true){
    res.render('click-data.ejs', {session:req.session});
  }
  else{
    //change back
    res.render('login.ejs', {session:req.session})
  }
});

app.get('/panel',function(req,res){
  let entries = [];
  connection.query('SELECT * FROM Users ;',function(err, results) {
  if (err) throw err
  req.session.loggedin = true;

  console.log(results)
  for(i = 0; i < results.length; i ++){
    var row = { id:results[i].id, email: results[i].email, username: results[i].username,  
      password : results[i].password , admin: results[i].admin, timestamp: results[i].timestamp  };
    entries.push(row);
    
  }
  
  res.json(entries);
  })
});

// Delete a specific entry from the User table (that matches the given id)
app.delete("/panel/:id", (req, res) => {
  connection.query(`DELETE FROM Users WHERE id = ${req.params.id}`, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    //deleted.
    return res.status(200).json('DELETED');

  });
});

app.put("/panel/:id", (req, res) => {
  if(req.body.admin != 1) req.body.admin = 0;

  let encryptedPassword = bcrypt.hashSync(`${req.body.password}`, 10);
  var put_query = `UPDATE Users SET email = \'${req.body.email}\', username = \'${req.body.username}\', 
  password = \'${encryptedPassword}\', admin = \'${req.body.admin}\' WHERE id = \'${req.body.id}\';` 

  connection.query(`SELECT * FROM Users WHERE id = ${req.params.id}`, function(error, results) {
    //user did not change the password
    if(String(results[0].password) == String(req.body.password)){
      put_query = `UPDATE Users SET email = \'${req.body.email}\', username = \'${req.body.username}\', 
      admin = \'${req.body.admin}\' WHERE id = \'${req.body.id}\';` 
    }
  });
  
  console.log(put_query)
  connection.query(put_query, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

  });
});

app.post('/panel', function(req, res){
  if(req.body.admin != 1) req.body.admin = 0;
  connection.query(`SELECT * FROM Users WHERE email = \'${req.body.email}\' or username = \'${req.body.username}\';`, function(err, results) {
    console.log(req.body);
    if (err){
      console.log(err);
      throw err
    }
    
    //Give error if username or email exists
    if(results.length != 0){
      console.log("FOUND Account");
      for(let i = 0; i < results.length; i++){
        if(results[i].email == req.body.email){
          console.log("Email already has associated profile");
          return res.status(500).json({ errors: { global: "Email already has associated profile" } });
        }
        if(i == results.length - 1){
          console.log("username already being used");
          return res.status(500).json({ errors: { global: "Username already being used" } });
        }
      }
    }

    //If the username and email is unique
    else{
      let encryptedPassword = bcrypt.hashSync(`${req.body.password}`, 10);
      console.log(encryptedPassword);
      var str = `INSERT INTO Users (email, username, password, admin) VALUES ( \'${req.body.email}\' , \'${req.body.username}\' , \'${encryptedPassword}\' , \'${req.body.admin}\');`;
      connection.query(str, function(error, results) {
        if(error){
          console.log(error);
          return res.status(500).json({ errors: { global: "Something went wrong" } });
        }
        //created
        
        return res.status(200).json('Created'); ;
        
      });
    }
    
  })
});

app.listen(2000, function() {
    console.log("Port 2000 is connected");
  });
