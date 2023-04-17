const { Comment } = require("../models/comment.model");
const User = require("../models/user.model");

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
    const comment = await Comment.findById(commentId);
    const user = await User.findById(comment.user);
    return { ...comment._doc, user: user._doc };
  } catch (err) {
    console.log(err);
    throw new Error("Server error");
  }
};
