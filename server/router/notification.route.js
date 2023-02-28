const express = require('express');
const jwt = require('jsonwebtoken');

const {GetAllUnreadNotifications, ClearAllUnreadNotifications} = require("../controller/notification.controller");
const { VerifyUser } = require('../helper/verifyUser');

/* router object */

const router = express.Router();

const VerifyToken = (req, res,next) => {

  const token = req.headers['authorization'];

  if(!token) {
    return next(CreateError(401,`Your are not authenticated`));
  }

  jwt.verify(token,process.env.JWT_TOKEN,(err,user) => {
    
    if(err){
      return next(CreateError(403, 'Token not valid'));
    }
    req.user = user;
  })
  next();
  
}


router.get('/', VerifyToken, GetAllUnreadNotifications);

router.put("/:id", VerifyUser, ClearAllUnreadNotifications);


module.exports = router;