const { default: mongoose } = require("mongoose");
const { CreateError } = require("../helper/error");
const {CommentModel} = require("../model/comment.model");
const {MemoryModel} = require("../model/memory.model");
const {UserModel} = require("../model/user.model");


const AllComments = async (req, res, next) => {

  try {

    const CurrentMemory = await MemoryModel.findOne({
      "_id": mongoose.Types.ObjectId(req.params.memoryid)
    }).populate("comments");

    if(!CurrentMemory){
      return next(CreateError(404, `No memory found for ${req.params.memoryid}`));
    }

    const {comments} = CurrentMemory;

    res.status(200).json(comments);
    
  } catch (error) {
    next(error);
  }

}


const PostComment = async (req, res, next) => {

  try {

  const newComment = new CommentModel({
    ...req.body,
  })

  const comment = await newComment.save();

  await MemoryModel.findByIdAndUpdate(req.params.memoryid,{
    
      $push: {
        comments: comment._id,
      }
    
  },{ new: true});

  const {comments} = await MemoryModel.findById(req.params.memoryid)
  .populate({ path : 'comments', options : { sort: {createdAt: -1} },  populate: 
    { path: 'author', select: '-password -memories -updatedAt -createdAt', model: 'User' } 
  });

  
  res.status(200).json(comments);
  
    
  } catch (error) {
    next(error);
  }

}

module.exports = {
  AllComments,
  PostComment
}