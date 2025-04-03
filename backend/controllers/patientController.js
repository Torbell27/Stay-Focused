import pool from "../config/db.js";

export const get = async (req, res) => {
  const patientId = req.userId;

  try {
    await pool.query(`SET app.user_uuid = '${patientId}'`);
    const request = await pool.query(
      "SELECT firstname, surname, lastname FROM users_pub"
    );

    if (request.rows.length > 0)
      return res.status(200).json({ id: patientId, ...request.rows[0] });
    else return res.status(404).json({ detail: "No patient data" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};
export const getActivity = async (req, res) => {
  const patientId = req.userId;

  try {
    await pool.query(`SET app.user_uuid = '${patientId}'`);
    const request = await pool.query(`SELECT activity FROM users_pub`);
    if (request.rows.length > 0) {
      return res.status(200).json(request.rows);
    } else {
      return res.status(204).json({ detail: "Activity does not exist" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};
