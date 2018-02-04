const express = require('express');

const db = require('../db');

let router = express.Router();

router.get('/', (req, res, next) => {
  db("musicas").then((musicas)=>{
    console.log(musicas);
    console.log();
    musicas.sort((x,y)=> x.id-y.id );
    console.log("musicas ordenadas");
    console.log(musicas);	  
    console.log("indice 3: ", musicas[3]);
    console.log("nome da musica: ", musicas[1].nome);
    res.render('index', { musicas:musicas }); 
  });
});

router.get('/add', (req, res, next) => {
    res.render("add");
});

router.post('/add', (req, res, next) => {
    db("musicas").insert(req.body).then((ids)=>{
        res.redirect('/');
    }, next);
});

router.get('/edit/:id', (req, res, next) => {
    //const id = req.params.id;
    const { id } = req.params;
    console.log("id do request: ", id);
    db("musicas").where("id", id).first().then((musica)=>{
        if(!musica){
	    return res.sendStatus(400);
	}
	console.log("musica do select", musica);
	res.render("edit" , { musica : musica });
    });
});

router.put('/edit/:id', (req, res, next) => {

});

router.delete('/delete:id', (req, res, next) => {

});

module.exports = router;
