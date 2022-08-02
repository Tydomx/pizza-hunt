// importing dependencies
// schema constructor and model function
const { Schema, model } = require('mongoose');
// importing dateFormat from utils
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
	{
		pizzaName: {
			type: String
		},
		createdBy: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// 'get' key allows us to transform data before it gets to the controller(s)
			// every time we retrieve a pizza, value in createdAt field will be formatted by datefFormat() function and used instead of default timestamp value
			get: (createdAtVal) => dateFormat(createdAtVal)
		},
		size: {
			type: String,
			default: 'Large'
		},
		toppings: [],
		comments: [
			{
				// this defines the type so that Mongoose knows to expect comment data from the comment model
				// ref tells Pizza model which documents to search to find the right comments
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	},
	{
		// telling schema that it can use virtuals
		toJSON: {
			virtuals: true,
			// telling Mongoose model that it should use any getter function we've specified
			getters: true
		},
		// prevents virtuals from creating duplicat of _id as `id`
		id: false
	}
);

// adding 'Virtual' to add more information to DB response so tha we don't have to add in information manually
// with helper before responding to API req
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
	// using .reduce method to tally up total of every comment with its replies
	// .reduce takes two parameters (accumlator, currentValue)
	return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;