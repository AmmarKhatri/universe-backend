const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
// community route registeration
const createCommunity = require("./createCommunity");
const getAllCommunities = require("./getAllCommunities");
const getCommunityById = require("./getCommunityById");
const joinCommunity = require("./joinCommunity");
const leaveCommunity = require("./leaveCommunity");
const archiveCommunity = require("./archiveCommunity");
const getPaginatedCommunityPosts = require("./getPaginatedCommunityPosts");
const getUserCommunities = require("./getUserCommunities");

router.post("/create", authMiddleware, createCommunity);
router.get("/user", authMiddleware, getUserCommunities);
router.get("/:id", authMiddleware, getCommunityById);
router.get("/", authMiddleware, getAllCommunities);
router.get("/:id/posts", authMiddleware, getPaginatedCommunityPosts);
router.put("/:id/join", authMiddleware, joinCommunity);
router.put("/:id/leave", authMiddleware, leaveCommunity);
router.put("/:id", authMiddleware, archiveCommunity);
module.exports = router;