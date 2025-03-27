import pool from "../config/db.js";
import pkg from 'jsonwebtoken';

const { sign } = pkg;

export const sign_in = async (req, res) => {
    const { username, password } = req.body;

    try {
        const request = await pool.query('SELECT user_auth_request($1, $2);', [username, password]);
        const userId = request.rows[0].user_auth_request;
        if (userId == "Error: Invalid login or password") return res.status(401).json({ status: 'Wrong mail or password' });

        await pool.query(`SET app.user_uuid = '${userId}'`); 
        const request2 = await pool.query('SELECT role FROM users_pub');
        const userRole = request2.rows[0].role;

        const refreshToken = sign({ userId: userId, userRole: userRole }, process.env.SESSION_SECRET_KEY, { expiresIn: '1d' });
        const accessToken = sign({ userId: userId, userRole: userRole }, process.env.SESSION_SECRET_KEY, { expiresIn: '15m' });

        console.log(`user: ${userId} authorized.`);
        return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};