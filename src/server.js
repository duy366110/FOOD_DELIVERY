"use strict"
import express from "express";
import helmet from "helmet";
import compression from "compression";
import multer from "multer";

import cloudinary from "./utils/util-cloudinary.js";
import router from "./router/router.js";
import routerAdmin from "./router/router-admin.js";
import routerCommon from "./router/router-common.js";
import middlewareCors from "./middleware/middleware-cors.js";

const app = express();
app.use(helmet());
app.use(compression());

app.use(express.urlencoded({extended: true}));
app.use(express.json(true));
app.use(middlewareCors.cors);

app.use(multer({ storage: cloudinary.storage }).any('thumb'));

app.use("/v1/api", router);
app.use("/v1/api/admin", routerAdmin);
app.use("/v1/api/common", routerCommon);

export default app;