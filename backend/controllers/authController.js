import pool from "../config/db.js";
import pkg from 'jsonwebtoken';

const { sign } = pkg;

export const sign_in = async (req, res) => {
    const { username, password } = req.body;

    try {
        const request = await pool.query('SELECT user_auth_request($1, $2)', [username, password]);

        if (request.rows[0].user_auth_request == "Error: Invalid login or password") return res.status(401).json({ status: 'Wrong mail or password' });

        const refreshToken = sign({ userId: request.rows[0].user_auth_request }, process.env.SESSION_SECRET_KEY, { expiresIn: '1d' });
        const accessToken = sign({ userId: request.rows[0].user_auth_request }, process.env.SESSION_SECRET_KEY, { expiresIn: '15m' });

        console.log(`user: ${request.rows[0].user_auth_request} authorized.`);
        return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};