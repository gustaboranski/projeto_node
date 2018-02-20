const authorize = {
	isAuth : (req, res, next)=>{
	    if(!req.isAuthenticated()){
		return res.redirect('/login');
	    }
	    next();
	},

	isNotAuth : (req, res, next)=>{
	    if(req.isAuthenticated()){
	        return res.redirect('/');
	    }
	    next()
	}
};

module.exports = authorize;
