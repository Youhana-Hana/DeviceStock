
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path')
  , loginConfig = require('./login/config')
  , mongoose = require('mongoose')  
  , mongooseAuth = require('mongoose-auth')  
  , everyauth = require('everyauth')
  , Promise = everyauth.Promise;

everyauth.debug = true;

var Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({})
  , User;

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
  , password: {
        loginWith: loginConfig.login.loginWith
      , everyauth: {
            getLoginPath: loginConfig.login.getPath
          , postLoginPath: loginConfig.login.postPath
          , loginView: loginConfig.login.view
          , getRegisterPath: loginConfig.register.getPath
          , postRegisterPath: loginConfig.register.postPath
          , registerView: loginConfig.register.view
          , loginSuccessRedirect: loginConfig.login.successRedirect
          , registerSuccessRedirect: loginConfig.register.successRedirect
        }
    }

});
// Adds login: String

mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/devicestock');

User = mongoose.model('User');

var app = express();

var dirname = path.dirname(__dirname);

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', dirname + '/www/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  //app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  //app.use(app.router);
  mongooseAuth.middleware();  
  app.use(require('stylus').middleware(dirname + '/www/public'));
  app.use(express.static(path.join(dirname, 'www/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/login', login.login);
app.get('/register', login.register);
app.get('/logout', user.logout);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
