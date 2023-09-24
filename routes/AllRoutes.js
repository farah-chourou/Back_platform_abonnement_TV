const express = require("express");
const router = express.Router();
const UserRoute = require("./UserRoutes");

const dynamicRouter = require("./DynamicRoutes");
router.use("/api", dynamicRouter);
router.use("/user", UserRoute);

module.exports = router;
