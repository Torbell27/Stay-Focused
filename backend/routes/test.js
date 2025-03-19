const express = require('express');
// const pool = require('../config/db');

const router = express.Router();
registerRoutes();

function registerRoutes() {
    router.get("/get", async (req, res) => {
        res.send('Hello, from api!');
    });
}

module.exports = router;