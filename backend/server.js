const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const routes = require('./routes');
const pool = require('./config/db');

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
sessionSecretKey = process.env.SESSION_SECRET_KEY;
// app.use(cookieParser(sessionSecretKey));
app.use(cors());
port = process.env.SERVER_PORT || 3000;
setupPool();
app.use('/adhd-support-app/api', routes);

function setupPool() {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('Error connecting to the database', err.stack);
    else console.log('Connected to the database:', res.rows);
  });
}

server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
