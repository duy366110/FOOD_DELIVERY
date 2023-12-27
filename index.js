"use strict"
import Instance from "./src/utils/util-db.js";
import app from "./src/server.js";
import environment from "./src/environment.js";

const server = app.listen(environment.port, (error) => {
    if(error) console.log("Start server unsuccessfull");
    console.log("Start server successfull");
})