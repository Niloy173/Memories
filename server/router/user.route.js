const express = require('express');
const {UpdateUser, GetUser} = require('../contoller/user.controller');
const { VerifyUser } = require('../helper/verifyUser');

/* router object */
const router = express.Router();


router.get("/:id", VerifyUser, GetUser);

router.put("/update/:id", VerifyUser, UpdateUser);

module.exports = router;