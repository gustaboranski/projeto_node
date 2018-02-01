const express = require('express');

const db = require('../db');

let router = express.Router();

router.get('/', (req, res, next) => {
  db("musicas").then((musicas)=>{
    //  res.render('index', {musicas:musicas}); 
    console.log(musicas);
  });
});

router.get('/add', (req, res, next) => {

});

router.post('/add', (req, res, next) => {

});

router.get('/edit/:id', (req, res, next) => {

});

router.put('/edit/:id', (req, res, next) => {

});

router.delete('/delete:id', (req, res, next) => {

});

module.exports = router;
