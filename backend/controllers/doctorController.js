import pool from "../config/db.js";

export const get = async (req, res) => {
  const doctorId = req.userId;

  try {
    await pool.query(`SET app.user_uuid = '${doctorId}'`);
    const request = await pool.query(
      "SELECT firstname, surname, lastname FROM users_pub"
    );

    if (request.rows.length > 0)
      return res.status(200).json({ id: doctorId, ...request.rows[0] });
    else return res.status(404).json({ detail: "No doctor data" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};

export const getPatients = async (req, res) => {
  const doctorId = req.userId;

  try {
    await pool.query(`SET app.user_uuid = '${doctorId}'`);
    const request = await pool.query(`SELECT * FROM patients_pub`);

    if (request.rows.length > 0) {
      return res.status(200).json(request.rows);
    } else {
      return res
        .status(404)
        .json({ detail: "No patients found for this doctor" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};
/* export const getStatistics = async (req, res) => {
  const doctorId = req.userId;

  try {
    await pool.query(`SET app.user_uuid = '${doctorId}'`);
    const request = await pool.query(`SELECT * FROM userstatistic`);

    if (request.rows.length > 0) {
      return res.status(200).json(request.rows);
    } else {
      return res.status(404).json({ detail: "Statistic does not exist" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
}; */

export const registerPatient = async (req, res) => {
  const { username, password, email, firstName, secondName, patronymic } =
    req.body;

  const doctorId = req.userId;

  try {
    const request = await pool.query(
      "SELECT user_register($1, $2, $3, $4, $5, $6, $7);",
      [doctorId, username, password, email, firstName, secondName, patronymic]
    );

    const result = request.rows[0].user_register;
    if (result === "Error: User with this login or email already exists")
      return res
        .status(400)
        .json({ status: "User with this login or email already exists" });

    const userId = request.rows[0].user_register;

    return res.status(200).json({
      status: "success",
      detail: `Patient with ID ${userId} registered`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};
