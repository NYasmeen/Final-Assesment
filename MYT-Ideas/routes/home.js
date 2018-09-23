var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";

/* GET users listing. */
router.get('/', (req, res, next ) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        /*Return only the documents with the address "Park Lane 38":*/
            dbo.collection("ideas").find().toArray(function(err, result) {
          if (err) throw err;
         length = result.length;
    
      res.render('home', {l:length , Info : result, title: 'MYT-Ideas' , myturl : 'https://is2-ssl.mzstatic.com/image/thumb/Purple118/v4/d4/fe/cc/d4fecc10-12fe-7cea-7d53-8db73380f5e8/AppIcon_-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'});
    
          db.close();
        });
      });
    })


    
   

module.exports = router;
