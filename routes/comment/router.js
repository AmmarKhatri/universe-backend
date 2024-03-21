const express = require("express")
const router = express.Router()

//controller paths
const authMiddleware = require("../../controllers/authMiddleware")

//comment route registration
const getComment = require("./getComment")
const getPaginatedComments = require("./getPaginatedComments")
const createComment = require("./createComment")
const deleteComment = require("./deleteComment")
const editComment = require("./editComment")


router.post("/", authMiddleware, createComment);
router.put("/:id", authMiddleware, editComment);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/:id", getComment);
router.get("/post/:id", getPaginatedComments);

module.exports = router;