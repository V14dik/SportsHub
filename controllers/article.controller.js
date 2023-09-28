const Article = require("../models/article.model");
const User = require("../models/user.model");
const { addComment, getComment } = require("./comment.controller");

module.exports.addArticle = async function (req, res) {
  try {
    const doc = new Article({
      name: req.body.newArticle.name,
      content: req.body.newArticle.content,
      categories: req.body.newArticle.categories,
      user: req.userId,
    });
    doc.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteArticle = async function (req, res) {
  try {
    Article.deleteOne({
      _id: req.body.articleId,
    })
      .then(function () {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addCommentToArticle = async function (req, res) {
  try {
    const newComment = await addComment({
      content: req.body.content,
      userId: req.userId,
      article: req.body.articleId,
    });

    await Article.updateOne(
      { _id: req.body.articleId },
      { $push: { comments: newComment._id } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.getArticle = async function (req, res) {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findOne({ _id: articleId }).catch(function (
      err
    ) {
      res.sendStatus(404).json({ message: "Bad request" });
      console.log(err);
    });
    const user = await User.findById(article.user);
    const comments = await Promise.all(
      article.comments.map(async (commentId) => {
        const comment = await getComment(commentId);
        return {
          ...comment,
        };
      })
    );

    res.json({ ...article._doc, comments, username: user.username });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.getArticles = async function (req, res) {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
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

module.exports.deleteArticle = async function (req, res) {
  try {
    const articleId = req.params.id;
    await Article.deleteOne({ _id: articleId });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateArticle = async function (req, res) {
  try {
    const articleId = req.params.id;
    console.log(articleId);
    await Article.findOneAndUpdate(
      { _id: articleId },
      { ...req.body.newArticle }
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};
