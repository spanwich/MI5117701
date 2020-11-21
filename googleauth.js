// const jwt = require('json-web-token')
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.google = function(req, res){
	passport.authenticate('google', { scope: [ 'email', 'profile' ] });
}

exports.callback = function (req, res){
    passport.authenticate('google', function(req, res) {
        //successRedirect: '/auth/google/success',
        //failureRedirect: '/auth/google/failure'
		console.log(req);
		console.log("login callback process");
		jwt.sign({userId: req.user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'5 min'}, (err, token) => {
			if(err){
				res.sendStatus(500);
			} else {
				//res.json({token});
				res.cookie("jwt", token, {secure: false, httpOnly: false})
				res.redirect(302, '/');
				//res.send()
			}
		});		
	})
}