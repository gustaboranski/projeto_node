const express = require('express');

const db = require('../db');

const passport = require('passport');

const isAuth = require('../middlewares/authorize').isAuth;

const isNotAuth = require('../middlewares/authorize').isNotAuth;

let router = express.Router();

router.get('/',isAuth , (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    db("musicas").then((musicas)=>{
        musicas.sort((x,y)=> x.id-y.id );
        console.log("cookies: ", req.cookies);
        console.log("session: ", req.session);
        console.log("req user: ", req.user);
        res.render('index', { musicas:musicas }); 
    });
});

router.get('/add', isAuth, (req,res,next)=>{
    res.render('add');
});

router.post('/add', isAuth, (req, res, next) => {
    db("musicas").insert(req.body).then((ids)=>{
        console.log("musica inserida com sucesso! Id: ", ids);
	res.status(201);
	res.redirect('/');
    }, next);

});

router.get('/edit/:id', isAuth , (req, res, next) => {
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

router.put('/edit/:id', isAuth, (req, res, next) => {
    const id = req.params.id;
    db("musicas").where("id", id).update(req.body).then((result)=>{
        if(result === 0){
	    return res.send(400);
	}
	res.redirect("/");
    },next);
});

router.delete('/delete/:id', isAuth, (req, res, next) => {
    const id  = req.params.id;
    db("musicas").where('id', id).delete().then((result)=>{
        if (result === 0 ){
	    return res.send(400);
	}
	console.log("Id " + id + " excluido com sucesso!");
	res.redirect("/");
    },next);
});

router.get('/teste', (req, res, next) => {
    res.render("teste", {qt : 3} );
});

router.get('/crypto/:pass', (req, res, next) => {
    //res.sendStatus(204);
    var { pass } = req.params;
    console.log();
    console.log('pass',pass)
    var salt  = bcrypt.genSaltSync(10);
    console.log('salt: ', salt);
    var hash = bcrypt.hashSync('senha',salt);
    console.log('hashSync: ', hash);
    var comp = bcrypt.compareSync(pass, hash);
    console.log('senha igual?', comp);
});

module.exports = router;
