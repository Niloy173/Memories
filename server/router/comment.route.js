const express = require('express');
const { PostComment, AllComments } = require("../contoller/comment.controller");
const { VerifyUser } = require('../helper/verifyUser');

const router = express.Router();

router.get("/:memoryid", AllComments);

router.post("/:id/:memoryid", VerifyUser, PostComment);


module.exports = router;