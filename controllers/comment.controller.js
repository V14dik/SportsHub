const { Comment } = require("../models/comment.model");

module.exports.addComment = async function (comment) {
  try {
    const doc = new Comment({
      content: comment.content,
      user: comment.userId,
      //user: req.userId,
      article: comment.articleId,
    });
    doc.save();
    return doc;
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};
