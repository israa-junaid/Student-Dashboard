const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();
const {
  signup,
  login,
  about,
  formdata,
  userdata,
  usernames,
  student_data,

  test,
} = require("./controller");

// **********  START OF Middleware for authentication

const authy = async (req, res, next) => {
  try {
    const verifyuser = await jwt.verify(req.cookies.jwt, process.env.SECRET);
    const mainuser = await user.findOne({
      _id: verifyuser._id,
      // "tokens.token": req.cookies.jwt,
    });
    // console.log(verifyuser, mainuser, "your user");
    if (!mainuser) {
      res.status(400).send("invalid");
    }

    req.mainuser = mainuser;
    req.name = mainuser.s_name;
    req.id = mainuser.id;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

// *********** END OF MIDDLEWARE ********

// ****************Route for adding student data to databse
router.post("/student/signup", signup);
// ************************route for login
router.post("/student/login", login);

// *********************Route for adding form data to databse************
router.post("/student/form", formdata);

//****************USED FOR AUTHENTICATION*/
router.get("/student/about", authy, about);

// ***********THIS ROUTE IS TO FETCH SPECIFIC STUDENT DATA****************
router.get("/student/:id", userdata);
//****************  ROUTE FOR FETCHING ALL STUDENT LIST */
router.get("/student/all/names", usernames);

// ********** ROUTE FOR FETCHING ON THE BASIS OF NAME
router.get("/studentof/:name", student_data);

//dont delete
router.get("/student/test/ahmed", test);

module.exports = router;
