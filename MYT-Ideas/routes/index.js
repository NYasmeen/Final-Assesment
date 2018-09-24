var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";

router.get('/', (req, res, next ) => {
  sess=req.session;
if(sess.email){
  res.redirect('/home');

}else{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user");
    /*Return only the documents with the address "Park Lane 38":*/
        dbo.collection("ideas").find().sort({like : -1}).toArray(function(err, result) {
      if (err) throw err;
     length = result.length;




  res.render('index', {l:length , Info : result, title: 'MYT-Ideas' , myturl : 'https://is2-ssl.mzstatic.com/image/thumb/Purple118/v4/d4/fe/cc/d4fecc10-12fe-7cea-7d53-8db73380f5e8/AppIcon_-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'});

      db.close();
    });
  });
}
  })

  router.post('/', (req, res) => {
    sess=req.session;

    MongoClient.connect(url, function(err, db) {
      let { name, email, password } = req.body;
      if (err) throw err;
      var dbo = db.db("user");
      var myobj = req.body;
      sess.email=req.body.email;

      dbo.collection('collection').findOne({ email }, (err, result) => {
        if (err) throw err;
  if(result){
    console.log("*Username is already exists.")
  }else{
  
      dbo.collection("collection").insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();


      });
    }
    });
    res.redirect('/home');

    });

    })



    router.post('/login', (req, res) => {
      sess=req.session;
      MongoClient.connect(url, function(err, db) {
        let { email, password } = req.body;
        if (err) throw err;
        var dbo = db.db("user");

sess.email=req.body.email;

        dbo.collection('collection').findOne({ email }, (err, result) => {
          if (err) throw err;
    if(result){
      console.log(result.password)
      if(result.password == password)
      {
        res.redirect('/home')

      }else{
        console.log("Invalid password")

      }
    }else{
      console.log("Invalid user id ")
       
      }
      });
        
      });
      })


  

  router.post('/like', (req, res) => {
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("user");
      var idea = JSON.parse(req.body.idea)
      var myquery = { idea: idea };
      dbo.collection('ideas').findOne({ idea }, (err, result) => {
        if (err) throw err;
        if (result) {
          console.log(result.like);
          var up = result.like+1 ;
          console.log(up);

          var newvalues = { $set: {like: up } };
      dbo.collection("ideas").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        
      });
        }

    
      });
    });
    res.redirect('/')
  });
  





module.exports = router;
