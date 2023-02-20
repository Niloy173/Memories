const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { CreateError } = require('../helper/error');


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

module.exports = {
  UpdateUser,
  GetUser
}