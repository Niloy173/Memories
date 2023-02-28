const express = require('express');
const { PostComment, AllComments, DeleteComment } = require("../contoller/comment.controller");
const { VerifyUser } = require('../helper/verifyUser');

const router = express.Router();

router.get("/:memoryid", AllComments);

router.post("/:id/:memoryid", VerifyUser, PostComment);

router.delete("/:id/delete", VerifyUser, DeleteComment);


module.exports = router;