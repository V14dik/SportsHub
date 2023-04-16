const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
