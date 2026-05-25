const express = require("express");
const router = express.Router();

// Import controller functions
const {
    addMember,
    getMembers,
    getMemberById
} = require("../controllers/memberController");


// ➕ Add a new member
// POST /members
router.post("/", (req, res) => {
    addMember(req, res);
});


// 📋 Get all members
// GET /members
router.get("/", (req, res) => {
    getMembers(req, res);
});

// 👤 Get member by ID
router.get("/:id", (req, res) => {
    getMemberById(req, res);
});


module.exports = router;