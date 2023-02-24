/* packages */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

/* internal dependencies */
const Authroute = require("./router/auth.route.js");
const Memoryroute = require("./router/memory.route.js");
const Userroute = require("./router/user.route.js");
const Commentroute = require("./router/comment.route.js");

/* internal dependencies */
const {connect} = require("./db/connection");

/* env configuration */
dotenv.config();

/* database configuration */
connect();


/* app object */
const app = express();

/* middleware */
app.use(cookieParser(process.env.COOKIE_TOKEN));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


/* routes */

app.use("/api/auth", Authroute);
app.use("/api/user", Userroute);
app.use("/api/memory", Memoryroute);
app.use("/api/comment", Commentroute);


/* port address */
const port = process.env.PORT || 8800;

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
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});