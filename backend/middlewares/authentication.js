import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;

const authenticate = (req, res, next) => {
    const accessToken = req.header('accessToken');
    const refreshToken = req.header('refreshToken');
    res.setHeader('newaccesstoken', null);

    if (accessToken) {
        verify(accessToken, process.env.SESSION_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Access token invalid, checking refresh token...");
                if (refreshToken) {
                    verify(refreshToken, process.env.SESSION_SECRET_KEY, (refreshError, decodedRefresh) => {
                        if (refreshError) {
                            req.userId = null;
                            req.userRole = null;
                            return next();
                        }
                        const userId = decodedRefresh.userId;
                        const userRole = decodedRefresh.userRole;

                        const newAccessToken = sign({ userId, userRole }, process.env.SESSION_SECRET_KEY, { expiresIn: '10s' });
                        res.setHeader('newaccesstoken', newAccessToken);

                        req.userId = userId;
                        req.userRole = userRole;

                        console.log(`New access token issued for user: ${userId}`);
                        return next();
                    });
                } else {
                    req.userId = null;
                    req.userRole = null;
                    return next();
                }
            } else {
                req.userId = decoded.userId;
                req.userRole = decoded.userRole;
                return next();
            }
        });
    } else if (refreshToken) {
        verify(refreshToken, process.env.SESSION_SECRET_KEY, (err, decodedRefresh) => {
            if (err) {
                req.userId = null;
                req.userRole = null;
                return next();
            }

            const userId = decodedRefresh.userId;
            const userRole = decodedRefresh.userRole;

            const newAccessToken = sign({ userId, userRole }, process.env.SESSION_SECRET_KEY, { expiresIn: '10s' });
            res.setHeader('newaccesstoken', newAccessToken);

            req.userId = userId;
            req.userRole = userRole;

            console.log(`New access token issued for user: ${userId}`);
            return next();
        });
    } else {
        req.userId = null;
        req.userRole = null;
        return next();
    }
};

export { authenticate };
