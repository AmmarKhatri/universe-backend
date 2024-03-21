const express = require("express")
const router = express.Router()

//controller paths
const authMiddleware = require("../../controllers/authMiddleware")

//impressions route registration
const createPostImpression = require("./createPostImpression")
const createCommentImpression = require("./createCommentImpression")
const getPostImpression = require("./getPostImpressions")
const getCommentImpression = require("./getCommentImpressions")
const getUserCommentImpression = require("./getUserCommentImpression")
const getUserPostImpression = require("./getUserPostImpression")

router.post("/post/:id", authMiddleware, createPostImpression);
router.post("/comment/:id", authMiddleware, createCommentImpression);
router.get("/post/:id", authMiddleware, getPostImpression);
router.get("/comment/:id", authMiddleware, getCommentImpression);
router.get("/user/comment/:id", authMiddleware, getUserCommentImpression);
router.get("/user/post/:id", authMiddleware, getUserPostImpression);

module.exports = router;