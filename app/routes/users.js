var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/teste', (req, res, next) => {
    res.setHeader("content-type","text/html");
    res.write("<h1> teste </h1>");
});

module.exports = router;
