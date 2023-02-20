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

    const Ownerid = await MemoryModel.findOne({ _id: req.params.id })
  .select('author');

  const UserInfo = await UserModel.findOne({ _id: req.body.userid },
    { username: 1, photo: 1});

  const role = req.body.userid === Ownerid && 'author' ;

  const newComment = new CommentModel({
    memory: req.params.memoryid,
    username: UserInfo.username,
    photo: UserInfo.photo,
    message: req.body.message,
    role
  })

  const comment = await newComment.save();

  await MemoryModel.findByIdAndUpdate(req.params.memoryId,{
    
      $push: {
        comments: comment._id,
      }
    
  },{ new: true});

  res.statu(200).json(comment);
    
  } catch (error) {
    next(error);
  }

}

module.exports = {
  AllComments,
  PostComment
}