var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var winston = require('winston');
var HttpError = require('./error').HttpError;
var app = express();

winston.add(winston.transports.File, { filename: config.get("logger"), level: 'info' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./middleware/sendHttpError'));

require('./routes/users')(app);
require('./routes/city')(app);
require('./routes/bill')(app);

/*
require('./routes/photos')(app);
require('./routes/albums')(app);
*/

app.use(logResponseBody);
//require('middleware/serverLog')(app);

console.log(config.get("logger"));


winston.handleExceptions(new winston.transports.File({
	filename: config.get("logger")
}));



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//app.use(logger('dev'));

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));



app.use(function(err, req, res, next){
	if(typeof err == 'number'){
		err = new HttpError(err);
	}
	if(err instanceof HttpError){
		res.sendHttpError(err);
	}
	});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function logResponseBody(req, res, next) {

	winston.info('=====REQUEST START=====');
	winston.info(req.headers);
	winston.info(req.query);
	winston.info(req.body);
	winston.info('=====REQUEST END=====');
	var oldWrite = res.write,
		oldEnd = res.end;

	var chunks = [];

	res.write = function (chunk) {
		chunks.push(chunk);

		oldWrite.apply(res, arguments);
	};

	res.end = function (chunk) {
		if (chunk)
			chunks.push(chunk);

		var body = Buffer.concat(chunks).toString('utf8');
		winston.info('=*=*=RESPONSE START=*=*=');
		winston.info(req.path, body);
		winston.info('=*=*=RESPONSE END=*=*=');
		oldEnd.apply(res, arguments);
	};

	next();
}

module.exports = app;
