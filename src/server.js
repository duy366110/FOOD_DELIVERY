"use strict"
import express from "express";
import helmet from "helmet";
import compression from "compression";

const app = express();
app.use(helmet());
app.use(compression());

export default app;