const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const keys = require('./server/config/keys');
const app = express();

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(
  session({
    key: 'aasanbul',
    secret: keys.secretOrKey,
    saveUninitialized: true,
    changeOrigin: true,
    resave: true,
    cookie: {
      expires: 150000, // 15 min
      secure: false,
      httpOnly: true,
    },
  }),
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(function(req, res, next) {
  req.session._garbage = Date();
  req.session.touch();
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./server/config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) // Let us remove that nasty deprecation warrning :)
  .then(() => console.info('MongoDB Connected'))
  .catch(err => console.error('error ======', err));

app.use('/api', routes);

// Serve only the static files form the dist directory
app.use(express.static('./dist/AdminPortal'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/AdminPortal/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
