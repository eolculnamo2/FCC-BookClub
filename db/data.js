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
  }//End Add Book
  //end exports
}