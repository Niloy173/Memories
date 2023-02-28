const mongoose = require('mongoose');

const { MemoryModel } = require("../model/memory.model");
const { UserModel } = require("../model/user.model");
const {NotificationModel} = require("../model/Notification.model");
const { CommentModel } = require("../model/comment.model");
const { CreateError } = require('../helper/error');


const UpdateActivity = async (req,res,next) => {
  
  try {

    const memoryid = req.body.memoryid;
    const userid = req.params.id;

    if(req.body.type === "like"){

      const {dislikes} = await UserModel.findById({"_id": mongoose.Types.ObjectId(userid) });

      if(dislikes.includes(memoryid)){

        await MemoryModel.findByIdAndUpdate(memoryid,
          { $inc:  {'activity.dislikes': -1 } },
        {new: true});

        await UserModel.findByIdAndUpdate(userid,
          { $pull: { dislikes: memoryid } },
        {new : true});

      }

      const {activity, title, photo, author, _id: memoryId} = await MemoryModel.findByIdAndUpdate(memoryid,
        { $inc: {'activity.likes': 1 } },
      {new: true}).populate("author");

      const { photo: userPhoto, username: userName, _id: userId} = await UserModel.findByIdAndUpdate(userid,
        { $push: { likes: memoryid } },
      {new : true});


      const newNotification = new NotificationModel({
        ownerid : author._id,
        reaction: "liked",
        user: {
          id: userId,
          name: userName,
          image: userPhoto ? userPhoto : "https://res.cloudinary.com/di8xxkudu/image/upload/v1677147090/upload/7612643-nophoto_rbjarr.png"
        },
        memory: {
          id: memoryId,
          title: title,
          image: photo
        }

      })

      await newNotification.save();
    
      res.status(200).json(activity);
      return
    }

    if(req.body.type === "removelike"){

      const {activity} = await MemoryModel.findByIdAndUpdate(memoryid,
        { $inc:  {'activity.likes': -1 } },
      {new: true});

      await UserModel.findByIdAndUpdate(userid,
        { $pull: { likes: memoryid } },
      {new : true});

      res.status(200).json(activity);
      return

    }


    if(req.body.type === "dislike"){

      const {likes} = await UserModel.findById({"_id": mongoose.Types.ObjectId(userid) });


      if(likes.includes(memoryid)){

        await MemoryModel.findByIdAndUpdate(memoryid,
          { $inc:  {'activity.likes': -1 } },
        {new: true});

        await UserModel.findByIdAndUpdate(userid,
          { $pull: { likes: memoryid } },
        {new : true});

      }

      const {activity, title, photo, author, _id: memoryId} = await MemoryModel.findByIdAndUpdate(memoryid,
        { $inc:  {'activity.dislikes': 1 } },
      {new: true});

      const { photo: userPhoto, username: userName, _id: userId} = await UserModel.findByIdAndUpdate(userid,
        { $push: { dislikes: memoryid } },
      {new : true});

      const newNotification = new NotificationModel({
        ownerid : author._id,
        reaction: "disliked",
        user: {
          id: userId,
          name: userName,
          image: userPhoto ? userPhoto : "https://res.cloudinary.com/di8xxkudu/image/upload/v1677147090/upload/7612643-nophoto_rbjarr.png"
        },
        memory: {
          id: memoryId._id,
          title: title,
          image: photo
        }

      })

      await newNotification.save();

      res.status(200).json(activity);
      return

    }


    if(req.body.type === "removedislike"){

      const {activity} = await MemoryModel.findByIdAndUpdate(memoryid,
        { $inc:  {'activity.dislikes': -1 } },
      {new: true});

      await UserModel.findByIdAndUpdate(userid,
        { $pull: { dislikes: memoryid } },
      {new : true});

      res.status(200).json(activity);
      return

    }




    
  } catch (error) {
    next(error);
  }
}

const CreateMemory = async (req,res,next) => {
  try {

    const foundMemory = await MemoryModel.findOne({
      title: req.body.title,
    })

    if(foundMemory){
      return next(CreateError(404, "Choose a different title"));
    }else{

      const newMemory = await MemoryModel({
        author: req.body.authorid,
        ...req.body
      })
      const savedMemory = await newMemory.save();

      await UserModel.findByIdAndUpdate(req.body.authorid,{
        $push : {
          memories : savedMemory._id,
        }
      },{ new: true})


      res.status(200).json(savedMemory);
    }
    
  } catch (error) {
    next(error);
  }
}


const DeleteMemory = async (req, res,next) => {

  try {

    const currentMemory = await MemoryModel.findOne({
    "_id": mongoose.Types.ObjectId(req.body.memoryid)
  });

  const currentUser = await UserModel.findOne({
    "_id": mongoose.Types.ObjectId(req.params.id)
  })

  const {memories} = currentUser;
 

  const updatedMemories = memories.filter(m => m.toString() !== currentMemory._id.toString());

  if(currentMemory){
    

    await UserModel.findByIdAndUpdate(req.params.id,{

        $set: {
          memories: updatedMemories
        }
      
    },{new: true});

    await CommentModel.deleteMany({ "memory": req.body.memoryid });
    await currentMemory.delete();

    res.status(200).json("Deleted Successfully");
  }else{
    return next(CreateError(404, `No memory found for ${req.params.id}`));
  }
    
  } catch (error) {
    next(error);
  }
}

const UpdateMemory = async (req,res,next) => {

  try {

    const currentMemory = await MemoryModel.findOne({
      "_id": mongoose.Types.ObjectId(req.params.memoryid)
    });

    if(currentMemory){

      const Updated = await MemoryModel.findByIdAndUpdate(
        req.params.memoryid,{
          $set: {
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo
          }
        },
     {new: true});

      res.status(200).json(Updated);
    }else{
      return next(CreateError(404, `No memory found for ${req.params.memoryid}`));
    }
    
  } catch (error) {
    next(error)
  }
}

const SingleMemory =  async (req,res,next) => {
  
  try {

    const FindMemory = await MemoryModel.findOne({
      "_id": mongoose.Types.ObjectId(req.params.id)
    })
    .populate({
      path: 'comments',
      options : { sort: {createdAt: -1} },
      populate: {
        path: 'author', select : '-password -memories -updatedAt -createdAt', model: 'User'
      }
      
    })
    .populate({
      path: 'author', select : '-password -updatedAt -createdAt'
    });

    res.status(200).json({
      FindMemory
    });
    
  } catch (error) {
    next(error)
  }
}

const FindAllMemory = async (req,res,next) => {

  try {

    let allMemories;

    const userid = req.query.userid;

    if(userid){
      allMemories = await MemoryModel.find({
        author: mongoose.Types.ObjectId(userid)
      }).populate({
        path: 'author',
        select: '-password',
      });
      
    }else{
      allMemories = await MemoryModel.find().sort("-createdAt").populate({
        path: 'author',
        select: '-password',
      });
    }

    res.status(200).json(allMemories);
    
  } catch (error) {
    next(error)
  }
}

module.exports ={
  CreateMemory,
  UpdateMemory,
  DeleteMemory,
  SingleMemory,
  FindAllMemory,
  UpdateActivity
}