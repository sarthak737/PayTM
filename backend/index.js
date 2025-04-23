const express = require("express");
const { apiRouter } = require("./src/routes/index.js");
const { connectDB } = require("./src/db/index.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

connectDB().then(() => {
  app.listen(3001);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/v1", apiRouter);
