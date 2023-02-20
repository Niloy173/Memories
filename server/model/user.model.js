const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

  username: {
    type: 'string',
    required: true,
  },

  email: { type: 'string', required: true},

  password: { type: 'string', required: true},

  photo: { type: 'string'},

  likes : {
    type: [String],
    ref: 'Memory'
  },

  memories : {
    type: [String],
    ref: 'Memory'
  }

},{
  timestamps: true,
})

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel
}