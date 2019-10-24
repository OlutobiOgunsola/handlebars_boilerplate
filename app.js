const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 4000;
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "/views/layouts")
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//listen

app.listen(PORT, (req, res) => {
  console.log(`App listening on port ${PORT}`);
});

const KEYS = {
  consumerKey: "pVza6cJZ9OS9FU2wwdSH97rBQ",
  consumerSecret: "Bthr51zHCNpg38BxD68VhwcIR24EkMYG8c3OBllTv0eVmEck5U",
  callbackURL: "http://localhost:3000/twitter/return"
};

passport.use(
  new Strategy(
    {
      consumerKey: KEYS.consumerKey,
      consumerSecret: KEYS.consumerSecret,
      callbackURL: KEYS.callbackURL
    },
    function(token, tokenSecret, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.serializeUser(function(user, callback) {
  callback(null, user);
});
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: "whatever", resave: true, saveUninitialized: true }));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/twitter/login", passport.authenticate("twitter"));
app.get(
  "/twitter/return",
  passport.authenticate("twitter", {
    failureRedirect: "/failed"
  }),
  function(req, res) {
    console.log(req);
    req.session.name = req.user.displayName;
    req.session.username = req.user.username;
    req.session.photo = req.user._json.profile_image_url;
    const token = req.query.oauth_token;
    const verifier = req.query.verifier;
    // console.log(token === KEYS.consumerKey);

    // if (token) {
    //   console.log("Match");
    //   app.post("https://api.twitter.com/oauth/access_token", (req, res) => {
    //     console.log("Begin Posting");
    //     req.headers["oauth_verifier"] = verifier;
    //     req.headers["oauth_token"] = token;
    //     req.headers["oauth_consumer_key"] = KEYS.consumerKey;
    //   });
    // }
    res.redirect("/threader");
  }
);

app.get("/failed", (req, res) => {
  res.render("index", {
    isLoggedIn: false
  });
});
app.get("/threader", function(req, res) {
  res.render("threader", {
    name: req.session.name,
    username: req.session.username,
    photo: req.session.photo
  });
});

module.exports = app;
