const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { CreateError } = require('../helper/error');
const { NotificationModel } = require('../model/Notification.model');


const {UserModel} = require('../model/user.model');

const UpdateUser = async(req,res,next) => {

  const userid = req.params.id
  try {
    const findUser = await UserModel.findOne({ "_id": mongoose.Types.ObjectId(userid)});

    if(findUser){

      if(req.body.password){

        req.body.password = await bcrypt.hash(req.body.password,10);
      
      }else{
        req.body.password = findUser.password;
      }

      const UpdateUser = await UserModel.findByIdAndUpdate(userid,{
        $set: req.body
      },{new: true});

      const newToken = await jwt.sign({
        id: UpdateUser._id,
        username: UpdateUser.username,
        email: UpdateUser.email,
        photo: UpdateUser.photo
      },process.env.JWT_TOKEN)

      res.status(200).json(newToken);

    }else{

      return next(CreateError(404, "User not found"));
    }
  } catch (error) {
    next(error);
  }
}

const GetUser = async (req, res, next) => {

  try {
    const user = await UserModel.findOne({
      "_id": mongoose.Types.ObjectId(req.params.id)
    });

    if(user){
      const {password, memories, ...others} = user._doc;
      res.status(200).json(others);
    }else{
      return next(CreateError(401, `No information available with id: ${req.params.id}`));
    }
  } catch (error) {
    next(error)
  }

}

const GetLikedMemories = async (req, res, next) => {

  try {

    const userid = req.params.id;

    const findLikedMemories = await UserModel.findOne({
      "_id": mongoose.Types.ObjectId(userid)
    }).populate({
      path: 'likes', options : { sort: {createdAt: -1} },
      select: '-updatedAt -activity',
      populate: {
        path: 'author', select: '-password -createdAt -updatedAt -likes -memories', model: 'User'
      }
    })


    if(findLikedMemories){
      const {likes} = findLikedMemories;
      res.status(200).json(likes);

    }else{
      res.status(200).json([]);
    }

    
  } catch (error) {
   
    next(error);
  }
}

const GetUserActivities = async (req, res, next) => {
  try {

    const userid = req.params.id;

    const findActivites = await UserModel.findOne({
      "_id": mongoose.Types.ObjectId(userid)
    }).populate("memories").sort("-createdAt");

    if(findActivites){
      const {memories} = findActivites;
      res.status(200).json(memories);

    }else{
      res.status(200).json([]);
    }
    
  } catch (error) {
    next(error);
  }
}


const GetNotifications = async (req,res,next) => {

  const userid = req.params.id;
  

  try {

    const GetAllUnreadNotifications = await NotificationModel.countDocuments({
      $and : [
        { read: false },
        { ownerid: mongoose.Types.ObjectId(userid) }
      ]
     });

    const GetAllNotifications = await NotificationModel.find({ ownerid: 
      mongoose.Types.ObjectId(userid) }).sort("-createdAt");

    res.status(200).json({
      notifications: GetAllNotifications,
      unread: GetAllUnreadNotifications
    })
    
  } catch (error) {
    next(error);
  }



}


module.exports = {
  UpdateUser,
  GetUser,
  GetLikedMemories,
  GetUserActivities,
  GetNotifications
}