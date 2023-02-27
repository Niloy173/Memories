let onlineUser = [];
const jwt = require('jsonwebtoken');


const addNewUser = ((username, socketId)=> {

  
  !onlineUser.some((user)=> user.username === username) &&
  onlineUser.push({ username: username, socketId: socketId })

  //console.log(onlineUser);

})

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user)=> user.socketId !== socketId);

  //console.log(onlineUser);
}

const getUser = (username) => {
  return onlineUser.find((user)=> user.username === username);
}

global.io.on("connection", (socket) => {
  // console.log("Someone has connected");

  socket.on("addNewUser", (token) => {

    if(token){

      jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {

        if(!err){
          addNewUser(user.username, socket.id);
        }else{
          //console.log('Invalid token');
        }
  
      })
    }
    
  });


  socket.on("sendNotification", ({senderName, reciverName, type}) => {

    const reciver = getUser(reciverName);
    
    if(reciver){
      global.io.to(reciver.socketId).emit("getNotifications",{
        senderName,
        type
      })
    }else{
      // Recevier is not logged in
      // do nothing
     // console.log('No receiver found');
    }

  })

  socket.on("disconnect", () =>{
    // console.log(
    //   "SomeOne has disconnected"
    // );
    removeUser(socket.id);
   
  })


})