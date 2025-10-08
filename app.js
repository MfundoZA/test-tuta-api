const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
console.log(`Example app listening on port ${port}!`);


var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

console.log('Path:' + path.join(process.cwd(), '/data', 'users.db'));

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var lessonRouter = require('./routes/lessonRoutes');
var subjectRouter = require('./routes/subjectRoutes');
var curriculumRouter = require('./routes/curriculumRoutes');
var gradeRouter = require('./routes/gradeRoutes');
var termRouter = require('./routes/termRoutes');
var topicRouter = require('./routes/topicRoutes');
var subtopicsRouter = require('./routes/subtopicRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/lessons', lessonRouter);
app.use('/subjects', subjectRouter);
app.use('/curriculums', curriculumRouter);
app.use('/grades', gradeRouter);
app.use('/terms', termRouter);
app.use('/topics', topicRouter);
app.use('/subtopics', subtopicsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
