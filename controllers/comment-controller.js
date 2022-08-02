// import models needed 'Comment' and 'Pizza'
// create two methods for adding/removing comments
const { Comment, Pizza } = require('../models');

const commentController = {
	// add comment to pizza
	// not standalone comment, belongs to a pizza
	addComment({ params, body }, res) {
		console.log(body);
		Comment.create(body)
			.then(({ _id }) => {
				return Pizza.findOneAndUpdate(
					{ _id: params.pizzaId },
					// add comment's id to specific pizza id we want to update
					{ $push: { comments: _id } },
					// receiving back the updated pizza (with new comment included)
					{ new: true }
				);
				// console.log(_id);
			})
			.then(dbPizzaData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No pizza found with this id!' });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch(err => res.json(err));
	},

	// addReply()
	addReply({ params, body }, res) {
		Comment.findOneAndUpdate(
			{ _id: params.commentId },
			{ $push: { replies: body } },
			{ new: true, runValidators: true }
		)
			.then(dbPizzaData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No comment found with this id!' });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch(err => res.json(err));
	},

	// remove comment
	removeComment({ params }, res) {

		// delete comment, and remove it from the pizza it's associated with
		Comment.findOneAndDelete({ _id: params.commentId })
			.then(deletedComment => {
				if (!deletedComment) {
					return res.status(404).json({ message: 'No comment with this id!' });
				}
				return Pizza.findOneAndUpdate(
					{ _id: params.pizzaId },
					{ $pull: { comments: params.commentId } },
					{ new: true }
				);
			})
			// take data we got and use it to ID and remove from associated pizza using Mongo $pull operation
			.then(dbPizzaData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No pizza found with this id!' });
					return;
				}
				// returned updated pizza data, without _id of comment in comments array, and return to user
				res.json(dbPizzaData);
			})
			.catch(err => res.json(err));
	},

	// remove reply
	removeReply({ params }, res) {
		Comment.findOneAndDelete(
			{ _id: params.commentId },
			// using $pull to remove specific reply from replies array where replyId matches value of params.replyId passed in from route
			{ $pull: { replies: { replyId: params.replyId } } },
			{ new: true }
		)
			.then(dbPizzaData => res.json(dbPizzaData))
			.catch(err => res.json(err));
	}
};




module.exports = commentController;