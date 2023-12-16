"use strict"
import app from "./src/server.js";
import environment from "./environment.js";

const server = app.listen(environment.port, (error) => {
    if(error) console.log("Start server unsuccess");
    console.log("Start server successfull");
})