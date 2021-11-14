const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = mongoose.model("User");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../keys");


router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      err: "all field require",
    });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "email already exists" });
      }

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
          });

          user
            .save()
            .then((user) => {
              res.json({
                mess: "data saved successfully",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doCheck) => {
        if (!doCheck) {
          return res.status(422).json({ error: "invalid email or password" });
        }

        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
        res.json({ token });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
