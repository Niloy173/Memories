const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({

  memory: { type: 'string', required: true },

  user: { type: 'string', required: true},

  photo: { type: 'string', required: true},

  message: { type: 'string', required: true},

  date: {
    type: Date, default: new Date().toLocaleDateString()
  }

},{
  timestamp: true
})

const CommentModel = new mongoose.model('Comment', CommentSchema);
module.exports ={
  CommentModel
}