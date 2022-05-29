const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv/config")

// User Register API
router.post("/register", async (req, res) => {
  const { username, password, firstname, lastname, phoneNum } = req.body;

  //Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedpassword = await bcrypt.hash(password, salt);

  // Check username
  const checkUser = await User.findOne({ username: username });
  if (checkUser) {
    return res.status(400).json({
      error: username + " is not already",
    });
  }

  // Check lenght of username and password
  if (username.length < 8 || password.length < 8) {
    return res.status(422).json({
      error: "username and password must be 8 character",
    });
  }

  if (!username || !password || !firstname || !lastname || !phoneNum) {
    return res.status(422).json({
      error: "Please complete the information",
    });
  }

  // Add USER to database
  const user = new User({
    username: username,
    password: hashedpassword,
    firstname: firstname,
    lastname: lastname,
    phoneNum: phoneNum,
  });
  await user
    .save()
    .then((saveDocument) => {
      saveDocument === user;
      console.log(saveDocument);
      res.status(200).json({
        message: "register success",
        username,
        password,
        firstname,
        lastname,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// User Login API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const validUsername = await User.findOne({ username: username });
  if (!validUsername) {
    return res.status(400).json({ 
        message: "username invalid" 
    });
  }
  const validPassword = await bcrypt.compare(password, validUsername.password);
  if (!validPassword) {
    return res.status(400).json({ 
        message: "password invalid" 
    });
  }
  if (validPassword == true && validUsername == true) {
    let payload = { _id: validUsername._id, per_mis:"user" };
    const accToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    const refToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_LIFE, {
      algorithm: "HS256",
      expiresIn: 300,
    });
    console.log(username + " login");
    console.log(accToken, refToken)
    res.status(200).json({
      AccessToken: accToken,
      RefreshToken: refToken,
      message: "login success",
      username: username,
    });
  } else {
    console.log("login fail");
    res.status(422).json({
      message: "login fail",
    });
  }
});

module.exports = router;
