// importing dependencies
// schema constructor and model function
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// ReplySchema
const ReplySchema = new Schema(
	{
		// set custom id to avoid confusion with parent comment _id
		replyId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		replyBody: {
			type: String
		},
		writtenBy: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		}
	},
	{
		toJSON: {
			getters: true
		}
	}
);


// CommentSchema
const CommentSchema = new Schema(
	{
		writtenBy: {
			type: String
		},
		commentBody: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		},
		// replies field populated with array of data that adheres to ReplySchema definition
		// use ReplySchema to validate data for a reply
		replies: [ReplySchema]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
	}
);

CommentSchema.virtual('replyCount').get(function () {
	return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;