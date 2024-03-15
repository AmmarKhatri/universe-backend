const express = require("express")
const router = express.Router()
//user route registeration
const loginUser = require("./loginUser")
const registerUser = require("./registerUser")
const getUser = require("./getUser")
const updateUser = require("./updateUser")
const authMiddleware = require("../../controllers/authMiddleware")
const deleteUser = require("./deleteUser")

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", authMiddleware ,getUser);
router.patch("/", authMiddleware, updateUser);
router.delete("/", authMiddleware ,deleteUser)

module.exports = router;