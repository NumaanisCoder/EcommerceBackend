const jwt = require('jsonwebtoken');

module.exports.getToken = (id, expiry) => {

    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry
    });

    return token;
}
module.exports.getEmailToken = (email, expiry) => {

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiry
    });

    return token;
}


module.exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return {
                valid: false,
                expired: true,
                decoded: null
            };
        } else {
            return {
                valid: false,
                expired: false,
                decoded: null
            };
        }
    }
};
