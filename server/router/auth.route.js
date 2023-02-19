const express = require('express');


/* router object */
const router = express.Router();

router.get("/", (req,res) => {
  res.send("hello, this is auth routes");
})

module.exports = router;