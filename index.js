"use strict"
import app from "./src/server.js";

const server = app.listen(3000, (error) => {
    if(error) console.log("Start server unsuccess");
    console.log("Start server successfull");
})