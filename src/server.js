"use strict"
import express from "express";
import helmet from "helmet";
import compression from "compression";
import router from "./router/router.js";

const app = express();
app.use(helmet());
app.use(compression());

app.use("/v1/api", router);
// app.use("/v1/api/admin", (req, res, next) => {});

export default app;