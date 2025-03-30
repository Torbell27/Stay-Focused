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

export const getPatients = async (req, res) => {
    const { doctorId } = req.params;  

    console.log(`Запрос на получение пациентов для доктора с ID: ${doctorId}`);

    try {
        await pool.query(`SET app.user_uuid = '${doctorId}'`);
        
        const patientsQuery = `
        `;

        const result = await pool.query(patientsQuery, [doctorId]);

        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ message: 'No patients found for this doctor' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const signUpPatient = async (req, res) => {
    const { doctorId, username, password, email, firstName, secondName, patronymic } = req.body; 

    console.log("Полученные данные:", { doctorId, username, password, email, firstName, secondName, patronymic});

    try {
        const request = await pool.query(
            'SELECT user_register($1, $2, $3, $4, $5, $6, $7);',
            [doctorId, username, password, email, firstName, secondName, patronymic]
        );

        const userId = request.rows[0].user_register;

        if (userId === "Error") {
            return res.status(400).json({ status: 'Registration error' }); 
        }
    
        return res.status(200).json({ status: "success", message: `Patient with ID ${userId} registered` });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' }); 
    }
    
};