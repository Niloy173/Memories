const {UserModel} = require('../model/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {CreateError} = require('../helper/error');

const RegisterUser = async (req, res, next) => {

  const findUser = await UserModel.find({
    $or: [
      {username: req.body.username},
      {email: req.body.email}
    ]
  });

  if(findUser.length){
    return next(CreateError(401, `User already exists`));
  }

  try {

    const hashedPassword = await bcrypt.hash(req.body.password,10)
    
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(200).send("User has been created successfully");
    
  } catch (error) {
    next(error);
  }

}

const LoginUser = async(req, res, next) => {

  try {
    const user = await UserModel.findOne({
      $or: [
        {email: req.body.user},
        {username: req.body.user}
      ]
    });

    if(!user) return next(CreateError(404, `User not found`));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if(!isPasswordCorrect) return next(CreateError(404, `Wrong password or credentials`));

    const {password, ...others} = user._doc;

    const newToken = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo ? user.photo : "https://res.cloudinary.com/di8xxkudu/image/upload/v1677147090/upload/7612643-nophoto_rbjarr.png"

    },process.env.JWT_TOKEN);

    // res.cookie('access_token', newToken, {
    //   maxAge: 1000 * 60 * 60 * 24,
    //   httpOnly: true,
    //   secure: true,
    // })

    res.status(200).json({
      token: newToken,
      likes: user.likes,
      dislikes: user.dislikes,
      activity: user.memories,
    });


  } catch (error) {
    next(error);
  }
}

module.exports = {
  RegisterUser,
  LoginUser
}