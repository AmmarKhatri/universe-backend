const express = require("express")
const router = express.Router()
//controller paths
const authMiddleware = require("../../controllers/authMiddleware")
// community route registeration
const createCommunity = require("./createCommunity")

router.post("/create", authMiddleware, createCommunity);
router.get("/:id", authMiddleware, createCommunity);