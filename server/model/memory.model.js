const mongoose = require('mongoose');

const MemorySchema = mongoose.Schema({

  author : {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },

  title : { type: 'String', requried: true },
  
  description: { type: 'String', requried: true},
  
  photo: { type: 'String', requried: true },
 
  activity: {
    
    likes: {
      type: 'Number',
      default: 0
    },

    dislikes: { type: 'Number', default: 0}
  },

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
    }
  ]



}, {
  timestamps: true
});

const MemoryModel = new mongoose.model("Memory", MemorySchema);
module.exports = {
  MemoryModel
}