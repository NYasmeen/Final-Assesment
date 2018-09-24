var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')



var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var errorRouter = require('./routes/error');



var app = express();

//Mongo

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";

//session

app.use(session({ secret: 'ssshhhhh' }));
var sess;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);

app.use('/users', usersRouter);
app.use('/error', errorRouter);



app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }


  });

});

app.post('/idea', (req, res) => {
  sess = req.session;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("user");
    let email = sess.email;
    var myobj = req.body;

    console.log(email);

    dbo.collection('collection').findOne({ email }, (err, result) => {
      if (err) throw err;
      if (result) {
        myobj.name = result.name;
        myobj.like = 1;

      }

      console.log(typeof (myobj));
      console.log(myobj);
      dbo.collection("ideas").insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
      });

    });
  });
  res.redirect('/');
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
