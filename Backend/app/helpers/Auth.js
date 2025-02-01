const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//verificación del token con JWT

const verifyToken = async (req, res, next) => {
    const jwtPassword = process.env.JWT_SECRET;

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({
            mensaje: 'You are no authorized'
        });
    }
    const token = authHeader;
    if (!token || token == 'null') {
        return res.json({
            mensaje: 'You are no authorized Null'
        });
    }
    jwt.verify(token, jwtPassword, (error, decoded) => {
        if (error) return res.status(401).json({
            mensaje: 'You are no authorized'
        });
        next();
        req.user = decoded;
    }
    );
}
module.exports = {
    verifyToken,
};