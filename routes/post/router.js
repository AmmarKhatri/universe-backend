const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
//post route registration
const createPost = require("./createPost");

router.post("/create", authMiddleware, createPost);

module.exports = router;