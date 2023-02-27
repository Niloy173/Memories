const { default: mongoose } = require('mongoose');
const {NotificationModel} = require('../model/Notification.model');


const GetAllUnreadNotifications = async (req,res,next) => {

  const read = req.query.read;

  try {
    
    const notifications = await NotificationModel.find({
      $and : [
        { read: read},
        { ownerid: mongoose.Types.ObjectId(req.user.id) }
      ]
    })

   
    res.status(200).json(notifications);

  } catch (error) {
    next(error);
  }

}

const ClearAllUnreadNotifications = async (req, res, next) => {

  try {
    
    await NotificationModel.updateMany({ ownerid: req.params.id, read: false}, {
      $set: {
        read: true,
      }
    },{ new: true});

    res.status(200).json("Updated successfully");

  } catch (error) {
    next(error);
  }

}

module.exports = {
  GetAllUnreadNotifications,
  ClearAllUnreadNotifications
}