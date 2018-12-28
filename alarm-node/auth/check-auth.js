const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_WEB_TOKEN);
        console.log("decodedtoken >>",decodedToken);
        req.userData = decodedToken;
        next();
    } catch( error ) {
        return res.status(401).json({
            message: 'Auth Failed ! Token Missing'
        });
    }
};