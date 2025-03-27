const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        const refreshToken = req.header('Refresh-Token');

        if (!refreshToken) {
            req.userId = null;
            req.userRole = null;
            return next();
        }

        jwt.verify(refreshToken, process.env.SESSION_SECRET_KEY, (err, decodedRefresh) => {
            if (err) {
                req.userId = null;
                req.userRole = null;
                return next();
            }

            const userId = decodedRefresh.userId;
            const userRole = decodedRefresh.userRole;

            const newAccessToken = jwt.sign({ userId, userRole }, process.env.SESSION_SECRET_KEY, { expiresIn: '15m' });
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);

            req.userId = userId;
            req.userRole = userRole;
            console.log(`New access token has been issued to the client: ${userId}`);
            return next();
        });
    } else {
        jwt.verify(accessToken, process.env.SESSION_SECRET_KEY, (err, decoded) => {
            if (err) {
                req.userId = null;
                req.userRole = null;
                return next();
            }

            req.userId = decoded.userId;
            req.userRole = decoded.userRole;
            next();
        });
    }
};

module.exports = { authenticate };
