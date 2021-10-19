const express = require('express');
const router = express();
const database = require('./database');


router.get("/contact", (req,res) => {
  res.render("contact")
});

module.exports = router;

