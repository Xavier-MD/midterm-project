
const express = require('express');
const router = express();
const database = require('./database');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

router.get("/login/:userid", (req,res) => {

  req.session.user_id = req.params.userid;
  res.redirect("/");
});

module.exports = router;
