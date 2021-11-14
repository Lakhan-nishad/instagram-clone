const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = mongoose.model("Post");

const requireLogin = require("../middleware/require-login");

router.post("/createPost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "require all the field" });
  }

//   const post = new Post({
//     title,
//     body,
//     postedby: req.user
//   });

//   post
//     .save()
//     .then((posted) => {
//       res.json({ posted });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
});

module.exports = router;
