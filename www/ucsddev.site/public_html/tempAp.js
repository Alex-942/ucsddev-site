const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require('mysql');
const { response } = require("express");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'CSE135rocks$',
    database : 'analytics'
  });

connection.connect((err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!')
});
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// Retrive every entry logged in the static table

app.get("/static", (req, res) => {
  let entries = [];
  connection.query('SELECT * FROM static;', function(err, results) {
    if (err) throw err
    
    
    for(i = 0; i < results.length; i ++){
      var row = { id:results[i].id, user_agent: results[i].user_agent, user_lang: results[i].user_lang,  
        accept_cookies : results[i].accept_cookies , allow_js: results[i].allow_js, allow_img: results[i].allow_img, 
        allow_css: results[i].allow_css, screen_dim: results[i].screen_dim, window_dim: results[i].window_dim ,
         conn_type: results[i].conn_type , timestamp: results[i].timestamp  };
      entries.push(row);
      
    }
    
    res.json({static: entries});
  })
  
});

// Retrieve a single Customer with customerId
app.get("/static/:id", (req, res) => {
  connection.query("SELECT * FROM static", function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    //IF it find the id that matches then return the obj
    for(i = 0; i < results.length; i++){
      if(results[i].id == req.params.id){
        return res.json(results[i]);
      }
    }

    //if it cannot find it then print this
    return res.status(500).json({ errors: { global: "Oi, This id doesn't exist!" } });

  })
});

// Add a new entry to the static table
/*app.post("/static/:user_agent/:user_lang/:acccept_cookies/:allow_js/:allow_img/:allow_css/:screen_dim/:window_dim/:conn_type", (req, res) => {
  res.json({ message: "Welcome to ucsddev.site." });
});*/


app.post("/static", (req, res) => {
  var str = `INSERT INTO static (session_id, user_agent, user_lang, accept_cookies, allow_js, allow_img, allow_css, screen_dim, window_dim, conn_type) VALUES (\'${req.body.session_id}\', \'${req.body.user_agent}\', \'${req.body.user_lang}\', \'${req.body.accept_cookies}\', \'${req.body.allow_js}\', \'${req.body.allow_img}\', \'${req.body.allow_css}\', \'${req.body.screen_dim}\', \'${req.body.window_dim}\', \'${req.body.conn_type}\');`;
  console.log(str);
  connection.query(str, function(err, results) {
  if (err) throw err
    //created.
    return res.status(200).json('Created');

  });
});

// Delete a specific entry from the static table (that matches the given id)
app.delete("/static/:id", (req, res) => {
  connection.query(`DELETE FROM static WHERE id = \'${req.params.id}`, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    //deleted.
    return res.status(200).json('DELETED');

  });
});

// Update a specific entry from the static table (that matches the given id)
app.put("/static/:id", (req, res) => {
  //const {user_agent, user_lang, accept_cookies, allow_js, allow_img, allow_css,  screen_dim, window_dim, conn_type, timestamp} = req.body;
  connection.query("UPDATE movies SET user_agent = $1, user_lang = $2, accept_cookies = $3, allow_js = $4, allow_img = $5, allow_css = $6,  screen_dim = $7, window_dim = $8, conn_type = $9, timestamp = $10 WHERE id = $11", 
  [req.params.user_agent, req.params.user_lang, req.params.accept_cookies, req.params.allow_js, req.params.allow_img, req.params.allow_css,  req.params.screen_dim, req.params.window_dim, req.params.conn_type, req.params.timestamp], function(error, results) {
    if(error){
      //console.log(error);
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

    //IF it find the id that matches then return the obj
    //for(i = 0; i < results.length; i++){
    //  if(results[i].id == req.params.id){
    //    return res.json(results[i]);
    //  }
    //}

    //if it cannot find it then print this
    //return res.status(500).json({ errors: { global: "Oi, This id doesn't exist!" } });

  });
});

app.listen(4000, function() {
  console.log("Port 7000 is connected");
});