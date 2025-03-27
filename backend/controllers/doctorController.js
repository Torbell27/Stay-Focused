import pool from "../config/db.js";

export const get = async (req, res) => {
    const { userId } = req.params;

    try {
        await pool.query(`SET app.user_uuid = '${userId}'`); 
        const request2 = await pool.query('SELECT * FROM users_pub');
        const userFirstname = request2.rows[0].firstname;
        const userSurname = request2.rows[0].surname;
        const userLastname = request2.rows[0].lastname;

        return res.status(200).json({ userFirstname, userSurname, userLastname });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};