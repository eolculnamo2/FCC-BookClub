var express = require('express');
var books = require('google-books-search');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
var db = require('../db/data');
var mongo = require('mongodb');

router.get("/",(req,res)=>{

	res.render('index',{
    note: ""
  })
})

router.get("/dashboard",(req,res)=>{

     res.render('dash', {
        name: req.cookies.username,
        books: req.cookies.books,
        allBooks: req.cookies.bookData

    });

  router.get("/inbox", (req,res)=>{

    db.checkInbox(req.cookies.username,(outbound,inbound)=>{
      res.render('trades',{
        name: req.cookies.username,
        outbound: outbound,
        inbound: inbound
      })
    })
  })

	//res.sendFile(__dirname + "/views/dash.ejs")
})

router.get('/logout', (req,res)=>{
  res.clearCookie('username')
  res.clearCookie('books')
  res.render('index',{
    note: 'Logout Successful'
  })
})


router.post('/settings',(req,res)=>{
  var info = {
    username: req.cookies.username,
    name: req.body.fullname,
    address: req.body.address,
    citystate: req.body.citystate
  }
  db.settings(info,()=>{
    res.redirect('/dashboard')
  })
})


module.exports = router;
