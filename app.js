const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const index = require('./routes/index');
const users = require('./routes/users');

const productListRouter = require('./components/productList/index');
const adminRouter = require('./components/admin/index');
const customerRouter = require('./components/customer/index');
const authRouter = require('./components/auth/index');
const loggedInUserGuard = require('./middlewares/loggedInUserGuard');
const billRouter = require('./components/bill/billRouter');
//const { session } = require('passport');
const passport = require('passport');


const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})



app.use('/', authRouter);
app.use('/', loggedInUserGuard.hasLogin, index);
app.use('/users', users);


app.use('/productlist', loggedInUserGuard.hasLogin, productListRouter);
app.use('/admin', loggedInUserGuard.hasLogin, adminRouter);
app.use('/customer', loggedInUserGuard.hasLogin, customerRouter);
app.use('/bill', loggedInUserGuard.hasLogin, billRouter);

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
