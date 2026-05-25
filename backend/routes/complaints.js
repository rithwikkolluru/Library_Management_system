const express = require("express");
const router = express.Router();

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");

// ➕ Add complaint (Member / Employee)
router.post("/", addComplaint);

// 📋 Get all complaints (Admin)
router.get("/", getComplaints);

// 🔄 Update complaint status (resolve)
router.put("/:id", updateComplaintStatus);

module.exports = router;