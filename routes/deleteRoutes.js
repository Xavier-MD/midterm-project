const express = require('express');
const router = express();
const database = require('./database');


router.get("/delete/:userid", (req,res) => {


  res.redirect("/");
});

module.exports = router;
