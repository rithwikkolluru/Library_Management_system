const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests,
  approveRequest,
  getRequestsByMember
} = require("../controllers/requestController");

// ➕ Create request
router.post("/", createRequest);

// 📋 Get all pending requests (Employee)
router.get("/", getRequests);

// 📋 Get requests by member ID
router.get("/member/:id", getRequestsByMember);

// ✅ Approve request
router.post("/approve", approveRequest);
router.put("/approve", approveRequest);

module.exports = router;