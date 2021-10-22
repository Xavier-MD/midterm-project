const express = require('express');
const router = express();
const database = require('./database');


router.get("/contact", (req,res) => {
  const templateVars = { user: req.session.user_id };
  res.render("contact", templateVars);
});

module.exports = router;

