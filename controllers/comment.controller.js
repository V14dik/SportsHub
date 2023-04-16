const { Comment } = require("../models/comment.model");

module.exports.addComment = async function (comment) {
  try {
    const doc = new Comment({
      content: comment.content,
      user: comment.userId,
      article: comment.articleId,
    });
    doc.save();
    return doc;
  } catch (e) {
    console.log(e);
  }
};

module.exports.getComment = async function (commentId) {
  try {
    const doc = await Comment.findById(commentId);
    return doc;
  } catch (err) {
    console.log(err);
    throw new Error("Server error");
  }
};
