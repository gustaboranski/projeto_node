let knex = require('knex');

let db = knex({
    client : 'pg',
    connection : {
        host : 'localhost',
	    user : 'gus',
	    password : 'senha',
	    database : 'musics',
	    port : 3306
    }
});

module.exports = db;
