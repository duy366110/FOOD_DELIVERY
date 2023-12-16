"use strict"
import express from "express";
import helmet from "helmet";

const app = express();
app.use(helmet());

const server = app.listen(3000, (error) => {
    if(error) console.log("Start server unsuccess");
    console.log("Start server successfull");
})