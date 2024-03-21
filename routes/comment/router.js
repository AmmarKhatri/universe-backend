const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
//post route registration
const createComment = require("./createComment");
const getComments = require("./getComments");
const getCommentById = require("./getCommentById");
const updateComment = require("./updateComment");
const deleteComment = require("./deleteComment");


router.post("/create", authMiddleware, createComment);
module.exports = router;