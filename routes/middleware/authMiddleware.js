const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const user = jwt.verify(token, config.get('jwtSecret'));

        if (user) {
            req.user = user;
        }
    } catch (error) {
        req.authError = error;
    }

    next();
};
