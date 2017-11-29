var express = require('express');
var books = require('google-books-search');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
var db = require('../db/data');
var mongo = require('mongodb');

//START REQUEST TRADE
  router.post('/trade',(req,res)=>{

    var info = {
      owner: req.body.user,
      title: req.body.title,
      picture: req.body.picture,
      username: req.cookies.username
    }

    db.requestTrade(info,()=>{
       res.render('dash',{
         name: req.cookies.username,
        books: req.cookies.books,
        allBooks: req.cookies.bookData
       })
    })

  })

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
