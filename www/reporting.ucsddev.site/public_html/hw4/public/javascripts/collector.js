var storage = window.localStorage;
var keys = {};

var userAgent = navigator.userAgent;
var userLang = navigator.language;
var cookiesPref = navigator.cookieEnabled;
var screenRes =  screen.width + " * " + screen.height;
var windowRes = window.outerWidth + "*" + window.outerHeight;
var connectionType = "null";
try{
  connectionType = navigator.connection.effectiveType;
}
catch(error){
  console.log("Broswer does not support navigator.connection.effectiveType");
}

var jsEnabled = false;
var imageEnabled = false;
var cssEnabled = false;

//tracks inactivity time
var timer, currSeconds = 0;



window.onload = function(event) {
  collect_and_send_static();
  track_user_enter();
  track_curr_page();
  resetTimer();
};

let activity_data = []
let user_enter = 0;

//tracks when the user loads into the page
function track_user_enter(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  user_enter = date + ' ' + time;

}

//tracks when the user leaves the page
window.addEventListener('beforeunload', (event) => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let leftTime = date + ' ' + time;
  record = {session_id: session_id, cursor_pos: '', clicks: "", scrolling:'', key_up_down:'',
                      break_end:'',break_length:0 , user_enter: String(user_enter), left_page:String(leftTime), 
                      page:String(window.location.href)};

  fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});
});

//tracks what page the user is on
function track_curr_page(){

  record = {session_id: session_id, cursor_pos: '', clicks: "", scrolling:'', key_up_down:'',
                      break_end:'',break_length:0 , user_enter: String(user_enter), left_page:'', 
                      page:String(window.location.href)};

  fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});
}




var id = storage.getItem('_lr_id_')
var session_id = id.substring(11,id.length-2);

//set a cookie using JS and then we test on the doc if we can find that cookie
//if we find it then JS is enabled if not then JS is not enabled :)
function jsCheck(){
    let cookieString = "key=JS enabled :)";
    document.cookie = cookieString;
    if(document.cookie.indexOf("; " + cookieString) != -1 ){
      jsEnabled = true;
    }
}


//Checks if images are enabled
//works on safari not chrome, may need to clear cache then refresh
function imageCheck(){
  var image = new Image();
  image.src = "https://upload.wikimedia.org/wikipedia/en/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png";
  if(image.width > 0){
    imageEnabled = true;
  }
}


//function to test whether the user enables css
//works on safari not chrome
function cssCheck() {
  var cssTest = document.createElement('div');
  cssTest.style.position = 'absolute';
  document.getElementsByTagName('body')[0].appendChild(cssTest);
  if (cssTest.currentStyle)
 	var currStyle = cssTest.currentStyle['position'];
  else if (window.getComputedStyle)
 	var currStyle = document.defaultView.getComputedStyle(cssTest, null).getPropertyValue('position');
  cssEnabled = (currStyle == 'static') ? false : true;
  document.getElementsByTagName('body')[0].removeChild(cssTest);
}

function collect_and_send_static(){
  jsCheck();
  imageCheck();
  cssCheck();

  storage.setItem('UA', userAgent);
  storage.setItem('UL', userLang);
  storage.setItem('CP', cookiesPref.toString());
  storage.setItem('SR', screenRes);
  storage.setItem('WR', windowRes);
  storage.setItem('CT', connectionType.toString());
  storage.setItem('JS', jsEnabled.toString());
  storage.setItem('IMG', imageEnabled.toString());
  storage.setItem('CSS', cssEnabled.toString())



  let static_data = {
    id: session_id,
    user_agent: storage.getItem('UA'),
    user_lang: storage.getItem('UL'),
    accept_cookies: storage.getItem('CP'),
    allow_js: storage.getItem('JS'),
    allow_img: storage.getItem('IMG'),
    allow_css: storage.getItem('CSS'),
    screen_dim: storage.getItem('SR'),
    window_dim: storage.getItem('WR'),
    conn_type: storage.getItem('CT')
  }
  

  createRecord('https://ucsddev.site/api/static', static_data);
}


//I think this might be easier to track the mouse movement
document.onmousemove = function(e){
  pos = `(${e.pageX}, ${e.pageY})`;
  record = {session_id: session_id, cursor_pos: pos, clicks: "", scrolling:'', key_up_down:'',
                      break_end:'',break_length:0 , user_enter: String(user_enter), left_page:'', 
                      page:String(window.location.href)};

  fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

  resetTimer();
}

//captures the mouse clicks postions and which button
document.onmousedown = function(e){
  pos = `(${e.pageX}, ${e.pageY})`;
  click = `Clicked: ${e.button} at (${e.pageX}, ${e.pageY})`;
  record = {session_id: session_id, cursor_pos: pos, clicks: click, scrolling:'', key_up_down:'',
                      break_end:'',break_length:0 ,user_enter: String(user_enter), left_page:'', 
                      page:String(window.location.href)};
fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

  resetTimer();
}


//Page scroll event
document.addEventListener('scroll', (event) => {
    
    record = {session_id: session_id, cursor_pos: '', clicks: "", scrolling: String(window.scrollY), key_up_down:'',
                        break_end:'',break_length:0 , user_enter: String(user_enter), left_page:'', 
                        page:String(window.location.href)};
  fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

  resetTimer();
});

//tracks the keyup events
document.onkeyup = function(e){
  
  record = {session_id: session_id, cursor_pos: '', clicks: "", scrolling: String(window.scrollY), key_up_down: String(e.code),
                        break_end:'',break_length:0 , user_enter: String(user_enter), left_page:'', 
                        page:String(window.location.href)};
  fetch('https://ucsddev.site/api/activity', {
    method: "POST",
    body: JSON.stringify(record),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

  resetTimer();
};



function resetTimer() {
    if(currSeconds >= 2000){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        record = {session_id: session_id, cursor_pos: '', clicks: "", scrolling: '', key_up_down: '',
                        break_end:dateTime,break_length:currSeconds , user_enter: String(user_enter), left_page:'', 
                        page:String(window.location.href)};
         fetch('https://ucsddev.site/api/activity', {
            method: "POST",
            body: JSON.stringify(record),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(function(response){
            if (response.status >= 200 && response.status <= 299) {
              return response.json();
            } else {
                throw Error(response.statusText);
            }         
          }) 
          .then().catch(error =>{});

    }
    /* Clear the previous interval */
    clearInterval(timer);
  
    /* Reset the seconds of the timer */
    currSeconds = 0;
  
    /* Set a new interval */
    timer = setInterval(startIdleTimer, 100);
}
  
document.addEventListener('ontouchstart', resetTimer);
  
function startIdleTimer() {
    /* Increment the timer seconds */
    currSeconds+=100;
}

var timingObject = null;
var pageLoad = 0;
var loadEnd = 0;
var loadStart = 0;
window.addEventListener('DOMContentLoaded', (event) => {
    timingObject = window.performance;
    
    loadStart = timingObject.timeOrigin;
    pageLoad = timingObject.now();
    loadEnd = loadStart+pageLoad;
    var id = storage.getItem('_lr_id_')
    var session_id = id.substring(11,id.length-2);
    let performance_data = {
      id:session_id,
      timing_obj:timingObject,
      load_start: loadStart,
      load_end:loadEnd,
      load_time: pageLoad
    
    }
    
    createRecord('https://ucsddev.site/api/performance', performance_data);
    

});



function createRecord(endpoint, data) {
  /* data has the following form ... JSON
  let data = {
    title: ti,
    author: auth
  }*/
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

}


function deleteRecord(endpoint) {

  fetch(endpoint, {
    method: "DELETE",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function(response){
    if (response.status >= 200 && response.status <= 299) {
        console.log(response.json())
        return response.json();
    } else {
        throw Error(response.statusText);
    }
  }) 
  .then().catch(error =>{});

}

function updateRecord(endpoint, data) {
  fetch(endpoint, {
    method: "PUT",
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(data)
  })
    .then(function(response){
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then()
    .catch(error =>{});
    
}

function fetchAll(endpoint) {
  // TODO
  fetch(endpoint, {
    method: 'GET'
  })
    .then(function(response){
      if (response.status >= 200 && response.status <= 299) {
          return response.json();
      } else {
          throw Error(response.statusText);
      }
    } )
    .then(data => keys = data)
    .catch(error =>{ throw error});
  return keys;
}


