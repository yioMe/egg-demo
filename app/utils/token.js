const jwt = require('jsonwebtoken'); // 引用加密模块
const key = "owzbC89th2MNR3mY";

module.exports = {

    async setToken(userId) {
        return jwt.sign(
            {
                userId: userId,
                iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 3 // toKen的有效期为三个月
            },
            key
        );
    },
    async getToken (token) {
        let result = null;
        jwt.verify(token,key,function (err, decoded) {
            if (err) {
                result = err;
            } else {
                if (decoded.iat < Math.floor(Date.now() / 1000)){
                    result = false;
                } else {
                    result = decoded
                }
            }
        });
        return result;
    }
}