const Article = require("../models/article.model");
const User = require("../models/user.model");

module.exports.addArticle = async function (req, res) {
  try {
    const doc = new Article({
      name: req.body.newArticle.name,
      content: req.body.newArticle.content,
      categories: req.body.newArticle.categories,
      user: req.userId,
    });
    res.sendStatus(200);
    doc.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports.getArticles = async function (req, res) {
  try {
    const articles = await Article.find();
    const data = await Promise.all(
      articles.map(async (article) => {
        const user = await User.findById(article.user);
        return {
          ...article._doc,
          userName: user.username,
        };
      })
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
