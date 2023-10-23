const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const {
  routerNotFoundHandler,
  errorHandler,
} = require("./src/middleware/errorHandler");
const { router } = require("./src/routes")


const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use(router);

app.use(routerNotFoundHandler);
app.use(errorHandler);

module.exports = { app };