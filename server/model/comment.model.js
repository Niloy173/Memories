const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({

  memory: { type: mongoose.Types.ObjectId, ref: 'Memory' },

  author: { type: mongoose.Types.ObjectId, ref: 'User'},

  text: { type: String, required: true }

},{
  timestamps: true
})

const CommentModel = new mongoose.model('Comment', CommentSchema);
module.exports ={
  CommentModel
}