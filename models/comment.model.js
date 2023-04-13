const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports.Comment = Comment;
module.exports.CommentSchema = CommentSchema;
