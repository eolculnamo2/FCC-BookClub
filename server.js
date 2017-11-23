var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db/data');
var books = require('google-books-search');
var mongo = require('mongodb');

var app = express();

//save data in cookies and use cookie parser with EJS to keep data active for users.
//https://www.npmjs.com/package/google-books-search

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


app.get("/",(req,res)=>{
  

	res.render('index',{
    note: ""
  })
})

app.get("/dashboard",(req,res)=>{
  
  //name will be changed to mongoDB user
    var name = "Rob"
     res.render('dash', {
        name: req.cookies.username,
        books: req.cookies.books
    });
  
	//res.sendFile(__dirname + "/views/dash.ejs")
})

app.get('/logout', (req,res)=>{
  res.clearCookie('username')
  res.clearCookie('books')
  res.render('index',{
    note: 'Logout Successful'
  })
})

//BEGIN REGISTER
app.post('/register',(req,res)=>{
  if(req.body.password === req.body.confirmPassword){
  
  var info = {
    username: req.body.user,
    password: req.body.password,
    books: []
  }
  
  db.newUser(info,(exist)=>{
    if(exist){
      res.render('index',{
        note: "User already Exists. Please try again."
      })
    }
    else{
      res.render('index',{
        note: "Registration Successful! Please login!"
      })
    }
  })
  
  }
  else{
res.send("Passwords Do Not Match");
  }
})
//END REGISTER

//BEGIN LOGIN
app.post('/login',(req,res)=>{
  
  var info = {
    username: req.body.user,
    password: req.body.password
  }
  
  db.login(info,(data, test)=>{
    if(!test){
      res.send("Invalid Credentials");
    }
    else if(test){
      res.cookie("username", data.username)
      res.cookie("books", data.books)
      res.render('dash',{
        name: req.cookies.username,
        books: req.cookies.books
      })
    }
  })
})
//END LOGIN


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
