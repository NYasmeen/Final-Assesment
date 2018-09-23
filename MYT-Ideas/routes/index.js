var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";

router.get('/', (req, res, next ) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user");
    /*Return only the documents with the address "Park Lane 38":*/
        dbo.collection("ideas").find().toArray(function(err, result) {
      if (err) throw err;
     length = result.length;

  res.render('index', {l:length , Info : result, title: 'MYT-Ideas' , myturl : 'https://is2-ssl.mzstatic.com/image/thumb/Purple118/v4/d4/fe/cc/d4fecc10-12fe-7cea-7d53-8db73380f5e8/AppIcon_-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'});

      db.close();
    });
  });
  })

  router.post('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
      let { name, email, password } = req.body;
      if (err) throw err;
      var dbo = db.db("user");
      var myobj = req.body;
      
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
      
    });
    res.redirect('/home');

    })



    router.post('/login', (req, res) => {
      MongoClient.connect(url, function(err, db) {
        let { email, password } = req.body;
        if (err) throw err;
        var dbo = db.db("user");

console.log(req.body)

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
      console.log(req.body);
      var id = req.body.id;
console.log("Hola" + id );
      var myquery = { name: "yasmeen" };
      var up = 19;
      var newvalues = { $set: {like: up } };
      dbo.collection("ideas").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        

      });
    });
    res.redirect('/')
  });
  

  router.post('/clicked', (req, res) => {

    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);
  
    db.collection('clicks').save(click, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      res.sendStatus(201);
    });
  });



module.exports = router;
