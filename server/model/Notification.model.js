const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({

  ownerid: { type: mongoose.Types.ObjectId, required: true },

  user: {

        id: { type: mongoose.Types.ObjectId, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true }
 
   
  },

  memory : { 

      id: { type: mongoose.Types.ObjectId, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true }
  

  },

  reaction: { type: String, required: true  }

},{
  timestamps: true,
})


const NotificationModel = mongoose.model("Notifications", NotificationSchema);

module.exports = {
  
  NotificationModel
}