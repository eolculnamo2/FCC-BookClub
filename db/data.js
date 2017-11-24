var mongo = require('mongodb');

var url = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@ds235785.mlab.com:35785/singletempo";

module.exports = {
  //Register New User
  newUser: function(info, callback){
    mongo.MongoClient.connect(url, (err,db)=>{
      db.collection('bookClub').findOne({username: info.username, password: info.password},(err,result)=>{
        if(result){
          callback(true)
        }
        if(!result){
          db.collection('bookClub').insert(info,(err, res)=>{
            callback(false);
          })
        }
      })
    })
  }, //End New User
  //Login
  login: function(info, callback){
    mongo.MongoClient.connect(url, (err,db)=>{
      db.collection('bookClub').findOne({username: info.username, password: info.password}, (err,result)=>{
 
        if(!result){
          callback(null, false)
        }
        else{
          callback(result, true)
        }
      })
    })
  },//End Login
  //Add Book
  addBook: function(user,info,callback){
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').update({username: user},
                                      {$push: {books: info}})
      db.collection('bookClub').findOne({username:user}, (err,result)=>{
        console.log(result.books)
        callback(result.books)
      })
    })
  },//End Add Book
  //Start List Books
  listBooks: function(callback){
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').find({}).toArray((err,result)=>{
        var completeArray = [];
        result.forEach((x)=>{
          completeArray.push([x.username, x.books])
        })
       callback(completeArray);
      })
    })
  },//End List Books
  requestTrade: function(info, callback){
    var share = {
      title: info.title,
      picture: info.picture,
      requestBy: info.username
    }
    var please = {
      title: info.title,
      picture: info.picture,
      requestFrom: info.owner
    }
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').update({username: info.owner},
                          {$push: {inRequests: share}})
      db.collection('bookClub').update({username: info.username},
                          {$push: {outRequests: please}})
      callback()
    })
  },//End List Books
  //Start Check Inbox
  checkInbox: function(user,callback){
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').findOne({username: user},(err,result)=>{
        var inbound = result.inRequests;
        var outbound = result.outRequests;
        callback(outbound,inbound)
      })
    })
  },//End Check Inbox
  //Delete Outbound Start
  deleteOutbound: function(info,callback){
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').updateOne({username: info.username},
                                      {$pull: {outRequests: {title: info.title}}})
        db.collection('bookClub').updateOne({username: info.requestFrom},
                                      {$pull: {inRequests: {title: info.title}}})
      db.collection('bookClub').findOne({username: info.username}, (err,result)=>{
        callback(result.outRequests, result.inRequests)
      })
    })
  },//End Delete Outbound
  //Start Delete Inbound
  deleteInbound: function(info,callback){
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').updateOne({username: info.requestBy},
                                      {$pull: {outRequests: {title: info.title}}})
        db.collection('bookClub').updateOne({username: info.username},
                                      {$pull: {inRequests: {title: info.title}}})
      db.collection('bookClub').findOne({username: info.username}, (err,result)=>{
        callback(result.outRequests, result.inRequests)
      })
    })
  },//End Delete Inbound
  //Start Accept Request
  acceptInbound: function(info, callback){
    var insert = {
      title: info.title,
      picture: info.picture
    }
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').updateOne({username: info.requestBy},
                                         {$push: {books: insert}})
      db.collection('bookClub').updateOne({username: info.requestBy},
                                         {$pull: {outRequests: {title: info.title}}})
      db.collection('bookClub').updateOne({username: info.username},
                                         {$pull: {inRequests: {title: info.title}}})
      db.collection('bookClub').updateOne({username: info.username},
                                         {$pull: {books: {title: info.title}}})
      db.collection('bookClub').findOne({username: info.username}, (err,result)=>{
        callback(result.outRequests, result.inRequests)
      })
    })
  },//End Accept Requests
  //Start Settings
  settings: function(info, callback){
    var personData= {
      fullname: info.name,
      address: info.address,
      citystate: info.citystate
    }
    mongo.MongoClient.connect(url,(err,db)=>{
      db.collection('bookClub').updateOne({username: info.username},
                                     {$set: {personalInfo: personData}})
      callback()
    })
  }
  //end exports
}