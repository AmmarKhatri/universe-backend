const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
//post route registration
const createPost = require("./createPost");
const editPost = require("./editPost");
const getSinglePost = require("./getSinglePost");
const deletePost = require("./deletePost");
const getSimilarPosts = require("./getSimilarPosts");

router.post("/create", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/similar", authMiddleware, getSimilarPosts);
router.patch("/:id", authMiddleware, editPost);
router.get("/:id", authMiddleware, getSinglePost);

module.exports = router;