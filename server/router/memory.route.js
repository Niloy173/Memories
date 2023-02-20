const express = require('express');
const {CreateMemory,UpdateMemory, DeleteMemory, FindAllMemory, SingleMemory} 
= require('../contoller/memory.controller');
const { VerifyUser } = require('../helper/verifyUser');


/* router object */
const router = express.Router();


router.get("/", FindAllMemory);

router.get("/:id", SingleMemory);

router.post("/:id", VerifyUser, CreateMemory);

router.put("/:id", VerifyUser, UpdateMemory);

router.delete("/:id", VerifyUser, DeleteMemory);

module.exports = router;