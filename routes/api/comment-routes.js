const router = require('express').Router();
// import methods from comment-controller
const {
	addComment,
	removeComment,
	addReply,
	removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
	.route('/:pizzaId')
	.post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
	.route('/:pizzaId/:commentId')
	.put(addReply)
	.delete(removeComment);

// delete route router.route('/:pizzaId/:commentId/:replyId').delete(removeReply)
// go to this pizza, look at this comment and delete this reply
router
	.route('/:pizzaId/:commentId/:replyId')
	.delete(removeReply);

module.exports = router;