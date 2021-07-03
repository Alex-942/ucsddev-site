//require modules
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require('mysql');
const { response } = require("express");

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
const cors = require('cors');
app.use(cors());
// Retrive every entry logged in the static table

app.get("/static", (req, res) => {
  let entries = [];
  connection.query('SELECT * FROM static;', function(err, results) {
    if (err) throw err
    
    
    for(i = 0; i < results.length; i ++){
      var row = { id:results[i].id, session_id:results[i].session_id,  user_agent: results[i].user_agent, user_lang: results[i].user_lang,  
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

  connection.query(`SELECT * FROM static where id = \'${req.body.id}\';`, function(err, results) {
    if (err) throw err
    
    if(results.length != 0){

      var put_query = `UPDATE static SET user_agent = \'${req.body.user_agent}\', user_lang = \'${req.body.user_lang}\', 
      accept_cookies = \'${req.body.accept_cookies}\', allow_js = \'${req.body.allow_js}\', allow_img = \'${req.body.allow_img}\', 
      allow_css = \'${req.body.allow_css}\',  screen_dim = \'${req.body.screen_dim}\', window_dim = \'${req.body.window_dim}\', 
      conn_type = \'${req.body.conn_type}\' WHERE id = \'${req.body.id}\';` 
      //console.log(put_query)
      connection.query(put_query, function(error, results) {
    if(error){
      //console.log(error);
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

  });

    }

    else{
      var str = `INSERT INTO static (id, user_agent, user_lang, accept_cookies, allow_js, allow_img, allow_css, screen_dim, window_dim, conn_type) 
      VALUES (\'${req.body.id}\', \'${req.body.user_agent}\', \'${req.body.user_lang}\', \'${req.body.accept_cookies}\', 
      \'${req.body.allow_js}\', \'${req.body.allow_img}\', \'${req.body.allow_css}\', \'${req.body.screen_dim}\', 
      \'${req.body.window_dim}\', \'${req.body.conn_type}\');`;
      connection.query(str, function(error, results) {
        if(error){
          console.log(error);
          return res.status(500).json({ errors: { global: "Something went wrong" } });
        }
        //console.log(req.body);
    //created
        return res.status(200).json('Created');

  });
    }
    
  })

});

// Delete a specific entry from the static table (that matches the given id)
app.delete("/static/:id", (req, res) => {
  connection.query(`DELETE FROM static WHERE id = ${req.params.id}`, function(error, results) {
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
  var put_query = `UPDATE static SET user_agent = \'${req.body.user_agent}\', user_lang = \'${req.body.user_lang}\', 
  accept_cookies = \'${req.body.accept_cookies}\', allow_js = \'${req.body.allow_js}\', allow_img = \'${req.body.allow_img}\', 
  allow_css = \'${req.body.allow_css}\',  screen_dim = \'${req.body.screen_dim}\', window_dim = \'${req.body.window_dim}\', 
  conn_type = \'${req.body.conn_type}\' WHERE id = \'${req.params.id}\';` 
  console.log(put_query)
  connection.query(put_query, function(error, results) {
    if(error){
      //console.log(error);
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

  });
});

/* Performance Route Below */
app.get("/performance", (req, res) => {
  let entries = [];
  connection.query('SELECT * FROM performance;', function(err, results) {
    if (err) throw err
    
    console.log(results)
    for(i = 0; i < results.length; i ++){

      var row = { id:results[i].id, timing_obj: results[i].timing_obj, load_start: results[i].load_start,  
        load_end : results[i].load_end , load_time: results[i].load_time, timestamp: results[i].timestamp  };
      entries.push(row);
      
    }
    
    res.json({performance: entries});
  })
  
});

// Retrieve a single Customer with customerId
app.get("/performance/:id", (req, res) => {
  connection.query("SELECT * FROM performance", function(error, results) {
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

app.post("/performance", (req, res) => {
  console.log(req.body)
  connection.query(`SELECT * FROM performance where id = \'${req.body.id}\';`, function(err, results) {
    if (err) throw err
    
    
    if(results.length != 0){
      var put_query = `UPDATE performance SET timing_obj = \'${String(JSON.stringify(req.body.timing_obj))}\', load_start = ${req.body.load_start}, 
      load_end = ${req.body.load_end}, load_time = ${req.body.load_time} WHERE id = \'${req.body.id}\';` 
      //console.log(put_query)
      connection.query(put_query, function(error, results) {
        if(error){
          console.log(error)
         return res.status(500).json({ errors: { global: "Something went wrong" } });
        }

        return res.status(200).json('Updated');
  
  });

    }
    else{

      var str = `INSERT INTO performance ( id, timing_obj, load_start, load_end, load_time) VALUES (\'${req.body.id}\', \'${req.body.timing_obj}\', \'${req.body.load_start}\', \'${req.body.load_end}\', \'${req.body.load_time}');`;
      connection.query(str, function(error, results) {
        if(error){
          console.log(error)
          return res.status(500).json({ errors: { global: "Something went wrong" } });
        }
       // console.log(req.body);
        //created
        return res.status(200).json('Created');

      });

    }

  })
  

});

// Delete a specific entry from the static table (that matches the given id)
app.delete("/performance/:id", (req, res) => {
  connection.query(`DELETE FROM performance WHERE id = ${req.params.id}`, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    //deleted.
    return res.status(200).json('DELETED');

  });
});

// Update a specific entry from the static table (that matches the given id)
app.put("/performance/:id", (req, res) => {
  
  //const {user_agent, user_lang, accept_cookies, allow_js, allow_img, allow_css,  screen_dim, window_dim, conn_type, timestamp} = req.body;
  var put_query = `UPDATE performance SET timing_obj = \'${req.body.timing_obj}\', load_start = \'${req.body.load_start}\', 
  load_end = \'${req.body.load_end}\', load_time = \'${req.body.load_time}\' WHERE id = \'${req.body.id}\';` 
  console.log(put_query)
  connection.query(put_query, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

  });



});

/*Activity Routes Below*/
app.get("/activity", (req, res) => {
  let entries = [];
  connection.query('SELECT * FROM activity;', function(err, results) {
    if (err) throw err
    
    
    for(i = 0; i < results.length; i ++){
      var row = { id:results[i].id, session_id:results[i].session_id,  cursor_pos: results[i].cursor_pos, clicks: results[i].clicks,  
        scrolling : results[i].scrolling , key_up_down: results[i].key_up_down, break_end: results[i].break_end, 
        break_length: results[i].break_length, user_enter: results[i].user_enter, left_page: results[i].left_page,
        page: results[i].page, timestamp: results[i].timestamp };
      entries.push(row);
      
    }
    
    res.json({activity: entries});
  })
  
});

// Retrieve a single Customer with customerId
app.get("/activity/:id", (req, res) => {
  connection.query("SELECT * FROM activity", function(error, results) {
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

app.post("/activity", (req, res) => {
  
  var str = `INSERT INTO activity (session_id, cursor_pos, clicks, scrolling, key_up_down, break_end, break_length, user_enter, left_page, page) 
  VALUES (\'${req.body.session_id}\', \'${req.body.cursor_pos}\', \'${req.body.clicks}\', \'${req.body.scrolling}\', \'${req.body.key_up_down}\', 
  \'${req.body.break_end}\', \'${req.body.break_length}\', \'${req.body.user_enter}\', \'${req.body.left_page}\', 
  \'${req.body.page}\');`;
  connection.query(str, function(error, results) {
    if(error){
      console.log(error)
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }
    
    //created
    return res.status(200).json('Created');

  }); 
});

// Delete a specific entry from the static table (that matches the given id)
app.delete("/activity/:id", (req, res) => {
  connection.query(`DELETE FROM activity WHERE id = ${req.params.id}`, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    //deleted.
    return res.status(200).json('DELETED');

  });
});

// Update a specific entry from the static table (that matches the given id)
app.put("/activity/:id", (req, res) => {
  //const {user_agent, user_lang, accept_cookies, allow_js, allow_img, allow_css,  screen_dim, window_dim, conn_type, timestamp} = req.body;
  var put_query = `UPDATE activity SET cursor_pos = \'${req.body.cursor_pos}\', clicks = \'${req.body.clicks}\',  
  scrolling = \'${req.body.scrolling}\', key_up_down = \'${req.body.key_up_down}\', break_end = \'${req.body.break_end}\',
  break_length = \'${req.body.break_length}\', user_enter = \'${req.body.user_enter}\', left_page = \'${req.body.left_page}\',
  page = \'${req.body.page}\' WHERE id = \'${req.params.id}\';` 
  console.log(put_query)
  connection.query(put_query, function(error, results) {
    if(error){
      return res.status(500).json({ errors: { global: "Something went wrong" } });
    }

    return res.status(200).json('Updated');

  });
});

app.listen(5000, function() {
  console.log("Port 5000 is connected");
});
