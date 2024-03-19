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

router.post("/create", authMiddleware, createCommunity);
router.get("/:id", authMiddleware, getCommunityById);
router.get("/", authMiddleware, getAllCommunities);
router.put("/:id/join", authMiddleware, joinCommunity);
router.put("/:id/leave", authMiddleware, leaveCommunity);
router.delete("/:id", authMiddleware, archiveCommunity);
module.exports = router;