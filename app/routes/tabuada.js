var express = require('express');
var router = express.Router();

router.get('/:valor', (req, res, next) => {
    var valor = req.params.valor;
    var resultado = (valor % 2) == 0 ? valor : false;
    
    res.render('tabuada', {numero : resultado});
});

module.exports = router;