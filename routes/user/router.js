const express = require("express")
const router = express.Router()
//controller paths
const refreshMiddleware = require("../../controllers/refreshMiddleware")
const authMiddleware = require("../../controllers/authMiddleware")
//user route registeration
const loginUser = require("./loginUser")
const registerUser = require("./registerUser")
const getUser = require("./getUser")
const updateUser = require("./updateUser")
const deleteUser = require("./deleteUser")
const refreshToken = require("./refreshToken")

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", authMiddleware ,getUser);
router.patch("/", authMiddleware, updateUser);
router.delete("/", authMiddleware ,deleteUser);
router.get("/refresh",refreshMiddleware, refreshToken);

module.exports = router;