import express from "express";
import testRouter from "./test.js";

const routes = express.Router();

// All Routes
routes.use("/test", testRouter);

export default routes;
