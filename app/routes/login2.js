const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const db = require('../db');


router.get('/', (req, res, next) => {
    console.log('session: ',req.session);
    if(req.session.usuario){
        res.redirect('/home');
    }else{
	console.log('nao tem sessao');
        res.render('login');
    }
});

//continuar
router.post('/', (req, res, next)=>{
    console.log("body: ", req.body);
    let input_user = req.body;
    console.log("input user: ", input_user);
    db("login")
        .where("usuario", input_user.usuario)
        .first()
        .then((db_user)=>{
		console.log('db user: ', db_user); 
            if(db_user === undefined){
	        return res.redirect('/');
	    }else{
	        if( (input_user.usuario === db_user.usuario) && ( bcrypt.compareSync(input_user.senha, db_user.senha) ) ){
		   req.session.usuario = input_user.usuario;
		   res.redirect('/home');
		}else{
		    res.redirect('/');
		}
	    }
    });                                                        });

router.get('/logout', (req, res, next)=>{
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
