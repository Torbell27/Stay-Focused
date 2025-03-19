const express = require('express');
const fs = require("fs");
const path = require("path");

const router = express.Router();

const safeImport = async (routePath) => {
  const fullPath = path.resolve(__dirname, routePath);
  try {
    await fs.promises.access(fullPath, fs.constants.F_OK);
    return require(fullPath);
  } catch (err) { return null; }
}
// -- All Routes

safeImport('./test.js').then((module) => {
  if (module) router.use('/test', module);
});

// --

module.exports = router;