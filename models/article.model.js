const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  name: String,
  content: String,
  categories: {
    type: [String],
  },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
