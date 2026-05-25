const express = require("express");
const router = express.Router();

const {
  addNotification,
  getNotifications
} = require("../controllers/notificationController");

// ➕ Add Notification (Admin sends)
router.post("/", addNotification);

// 📋 Get Notifications for a user
router.get("/:role/:id", getNotifications);

module.exports = router;
