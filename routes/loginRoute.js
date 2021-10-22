
const express = require('express');
const router = express();
const database = require('./database');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

router.get("/login/:userid", (req, res) => {
  req.session.user_id = req.params.userid;
  res.redirect("/");
});

// Login user
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // Look for the user
  database.getUserWithEmail(email)
    .then(user => {
      console.log(user);
      // Correct username and password, set the cookie, redirect to url list
      req.session.user_id = user.id;
      res.redirect("/");
    });
});

router.get('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect("/");
});


module.exports = router;
