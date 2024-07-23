var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
var configRouter = require('./routes/config');
var s3 = require('./routes/s3');

require('dotenv').config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

//Routes
app.use('/', indexRouter);
app.use('/config', configRouter);
app.use('/s3', s3);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error("Internal Error");

  console.error(err);

  return res.status(err.status || 500).json({
    message: "Internal Error",
  });


});

module.exports = app;