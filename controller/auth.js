const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    const isExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (isExist) {
      return res.status(400).send({
        message: "User Already Exist",
      });
    }
    let EncryptedPassword = await bcrypt.hash(req.body.password, 16);
    const registerUser = await User.create({
      ...req.body,
      password: EncryptedPassword,
    });
    const { password, ...rest } = registerUser.dataValues;
    return res.status(201).send({
      message: "User Registered Successfully",
      user: { ...rest },
    });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const LoginUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!LoginUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    bcrypt.compare(password, LoginUser?.password, function (err, response) {
      if (err) {
        return res.status(500).send({ message: `Error ${err}` });
      }
      if (response) {
        const accessToken = jwt.sign({ id: LoginUser.id }, "club_secret", {
          expiresIn: "1d",
        });
        return res.status(200).json({
          accessToken,
          user: {
            id: LoginUser.id,
            name: LoginUser.name,
            email: LoginUser.email,
          },
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

module.exports = router;
