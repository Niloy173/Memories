/* packages */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

/* internal dependencies */
const Authroute = require("./router/auth.route");
const Memoryroute = require("./router/memory.route");
const Userroute = require("./router/user.route");

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
app.use("/auth/user", Userroute);
app.use("/api/memory", Memoryroute);


/* port address */
const port = process.env.PORT || 8800;



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