const express = require('express');
const {LoginUser, RegisterUser} = require('../contoller/auth.controller');


/* router object */
const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);

module.exports = router;