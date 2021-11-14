const mongoose = require("mongoose");
const { objectId } = mongoose.Schema.Types;
const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    default: "No photo",
  },
  postedby: {
    type: objectId,
    ref: "User",
  },
});

mongoose.model("Post", postSchema);
