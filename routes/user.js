var express = require('express');
var books = require('google-books-search');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
var db = require('../db/data');
var mongo = require('mongodb');


//BEGIN REGISTER
router.post('/register',(req,res)=>{
  if(req.body.password === req.body.confirmPassword){

  var info = {
    username: req.body.user,
    password: req.body.password,
    books: [],
    inRequests: [],
    outRequests: []
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
router.post('/login',(req,res)=>{
  var listBookData =[];
  db.listBooks((list)=>{

    list.forEach((x)=>{
      x[1].forEach((y)=>{
        var obj = {
          user: x[0],
          title: y.title,
          picture: y.picture
        }
        listBookData.push(obj);

      })
    })

   res.cookie("bookData", listBookData)

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

 res.redirect('/dashboard')
    }
  })
      })
})
//END LOGIN


//ADD BOOK
router.post('/addBook',(req,res)=>{
  var newBook = req.body.newBook;

  books.search(newBook, function(error, results) {
    if ( ! error ) {

        var info = {
          title: results[0].title,
          author: results[0].authors,
          picture: results[0].thumbnail
        }
        console.log(info)
        db.addBook(req.cookies.username,info,(updated)=>{
          res.cookie("books", updated)

          res.redirect('/dashboard')
        })
    } else {
        console.log(error);
    }
});

})
//END ADD BOOK

//START REQUEST TRADE

  router.post('/trade',(req,res)=>{

    var info = {
      owner: req.body.user,
      title: req.body.title,
      picture: req.body.picture,
      username: req.cookies.username
    }
console.log("Process"+ info.information)
    db.requestTrade(info,()=>{
       res.render('dash',{
         name: req.cookies.username,
        books: req.cookies.books,
        allBooks: req.cookies.bookData
       })
    })

  })

//END REQUEST TRADE

//Delete Outbound Trade Request
router.post("/delete",(req,res)=>{
  var info = {
    requestFrom: req.body.requestFrom,
    title: req.body.title,
    picture: req.body.picture,
    username: req.cookies.username
  }

  db.deleteOutbound(info, (outbound,inbound)=>{
        res.render('trades',{
        name: req.cookies.username,
        outbound: outbound,
        inbound: inbound
      })
  })
})
//Delete Inbound Trade Request
router.post("/deleteInbound",(req,res)=>{
    var info = {
    requestBy: req.body.requestBy,
    title: req.body.title,
    picture: req.body.picture,
    username: req.cookies.username
  }
    db.deleteInbound(info,(outbound,inbound)=>{
      res.render('trades',{
        name: req.cookies.username,
        outbound: outbound,
        inbound: inbound
      })
    })
})

//Accept Trade Request
router.post("/accept",(req,res)=>{
  var info = {
    requestBy: req.body.requestBy,
    title: req.body.title,
    picture: req.body.picture,
    username: req.cookies.username
  }
  db.acceptInbound(info, (outbound,inbound)=>{
    res.render('trades',{
        name: req.cookies.username,
        outbound: outbound,
        inbound: inbound
      })
  })
})


module.exports = router;
