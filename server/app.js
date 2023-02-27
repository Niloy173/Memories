/* packages */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const {Server} = require('socket.io');
const http = require('http');

/* internal dependencies */
const Authroute = require("./router/auth.route.js");
const Memoryroute = require("./router/memory.route.js");
const Userroute = require("./router/user.route.js");
const Commentroute = require("./router/comment.route.js");
const Notificationroute = require("./router/notification.route.js");

/* internal dependencies */
const {connect} = require("./db/connection");

/* env configuration */
dotenv.config();

/* database configuration */
connect();


/* app object */
const app = express();
const server = http.createServer(app);

/* middleware */
app.use(cookieParser(process.env.COOKIE_TOKEN));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


/* routes */

app.use("/api/auth", Authroute);
app.use("/api/user", Userroute);
app.use("/api/memory", Memoryroute);
app.use("/api/comment", Commentroute);
app.use("/api/notifications", Notificationroute);


/* port address */
const port = process.env.PORT || 8800;


/* socket request */
const io = new Server(server,{
  cors: {
    origin: /^https?:\/\/(localhost:3000|memories-e8ba\.onrender\.com)$/
  }
});

/* global use case */
global.io = io;

/* all socket requests */
require('./socket/socket');

app.use(express.static(path.join(__dirname,"/../client/build/")));
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, "/../client/build/index.html"))
});



/* error handler moduler */
app.use((err, req, res, next) => {

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: err.stack || null
  });

})

/* listener */
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});