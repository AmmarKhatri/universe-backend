const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
//post route registration
const createPost = require("./createPost");
const deletePost = require("./deletePost");

router.post("/create", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
module.exports = router;