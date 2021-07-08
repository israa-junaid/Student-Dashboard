const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.use(cors());
const router = require("./Rout/router");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router);

app.listen(5000, () => {
  console.log("app is listening on port 5000");
});
