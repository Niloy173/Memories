const express = require('express');
const {UpdateUser, GetUser , GetLikedMemories, GetUserActivities, GetUserActivityCount} = require('../contoller/user.controller');
const { VerifyUser } = require('../helper/verifyUser');

/* router object */
const router = express.Router();


router.get("/:id", VerifyUser, GetUser);

router.get("/:id/likes", VerifyUser, GetLikedMemories);

router.get("/:id/activity", VerifyUser, GetUserActivities);

router.put("/update/:id", VerifyUser, UpdateUser);

module.exports = router;