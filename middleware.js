//const jwt = require('json-web-token')
const jwt = require('jsonwebtoken');

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
		console.log(accessToken);
		console.log(process.env.ACCESS_TOKEN_SECRET);
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS512'] })
		console.log(payload);
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
		console.log(e)
		res.clearCookie("jwt");
		if(e instanceof jwt.TokenExpiredError) {
            return res.redirect('/login'); 
        }
        return res.status(401).send()
    }
}