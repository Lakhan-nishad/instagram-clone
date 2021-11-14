const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys");

const PORT = 4000;

require("./models/user");
require("./models/post");

mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb yehh");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
