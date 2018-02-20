const db = require('./db');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

//fields customizam o nome do campo do html post, por default username e password
passport.use(new LocalStrategy( { usernameField : 'usuario', passwordField: 'senha' }, (username, password, done)=>{
    db('login').where("usuario", username)
        .first()
	.then((db_user)=>{
		if( !db_user  ||  !bcrypt.compareSync(password, db_user.senha) ) {
	        console.log("db user  ", db_user);
	        return done(null,false);
	    }
	    done(null, db_user);
	},done);
}));

passport.serializeUser((db_user, done)=>{
	done(null,db_user.id);
});

passport.deserializeUser((id, done)=>{
    db("login").where("id", id).first().then((db_user)=>{
        delete db_user.senha;
	done(null,db_user);
    },done);
});
