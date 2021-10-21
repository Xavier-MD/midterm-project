const express = require('express');
const router = express();
const database = require('./database');


router.post("/delete/:userid", (req,res) => {
console.log("request coming from delete route: ",req);

  res.redirect("/");
});

module.exports = router;
