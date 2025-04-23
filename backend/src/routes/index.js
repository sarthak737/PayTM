const express = require("express");
const { userRouter } = require("./user");
const { accountRouter } = require("./accounts");

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/account", accountRouter);

module.exports = {
  apiRouter,
};
