const mongoose = require('mongoose');

const { MemoryModel } = require("../model/memory.model");
const { UserModel } = require("../model/user.model");
const { CreateError } = require('../helper/error');


const CreateMemory = async (req,res,next) => {
  try {

    const foundMemory = await mongoose.findOne({
      title: req.body.title,
    })

    if(!foundMemory){
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
    "_id": mongoose.Types.ObjectId(req.params.id)
  });

  const currentUser = await UserModel.findOne({
    "_id": mongoose.Types.ObjectId(req.body.userid)
  })

  const {memories} = currentUser;

  const updatedMemories = memories.filter(m => m !== currentMemory._id)

  if(currentMemory){
    

    await UserModel.findByIdAndUpdate(req.body.userid,{

        $push: {
          memories: updatedMemories
        }
      
    },{new: true});

    await currentMemory.delete();
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
      "_id": mongoose.Types.ObjectId(req.params.id)
    });

    if(currentMemory){

      const Updated = await MemoryModel.findByIdAndUpdate(
        req.params.id,{
          $set: {
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo
          }
        },
     {new: true});

      res.status(200).json(Updated);
    }else{
      return next(CreateError(404, `No memory found for ${req.params.id}`));
    }
    
  } catch (error) {
    next(error)
  }
}

const SingleMemory =  async (req,res,next) => {
  try {

    const FindMemory = await MemoryModel.findOne({
      "_id": mongoose.Types.ObjectId(req.params.id)
    }).populate('comments');

    res.status(200).json(FindMemory);
    
  } catch (error) {
    next(error)
  }
}

const FindAllMemory = async (req,res,next) => {

  try {

    let allMemories;

    const userid = req.query.userid;

    if(username){
      allMemories = await MemoryModel.find({
        author: userid
      })
    }else{
      allMemories = await MemoryModel.find();
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
  FindAllMemory
}