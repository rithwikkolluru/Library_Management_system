const db = require("../config/db");

// ➕ Add Notification (Admin sends to Member/Employee)
exports.addNotification = (req, res) => {
  const { user_id, role, message } = req.body;

  if (!user_id || !role || !message?.trim()) {
    return res.status(400).json({
      message: "user_id, role, and message are required"
    });
  }

  const sql = `
    INSERT INTO Notifications (user_id, role, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, role, message], (err, result) => {
    if (err) {
      console.error("ADD NOTIFICATION ERROR:", err);
      return res.status(500).json({
        message: "Error adding notification"
      });
    }

    res.status(201).json({
      message: "🔔 Notification sent",
      notification_id: result.insertId
    });
  });
};

// 📄 Get Notifications for a specific user
exports.getNotifications = (req, res) => {
  const { role, id } = req.params;

  const sql = `
    SELECT id, message, created_at
    FROM Notifications
    WHERE role = ? AND user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [role, id], (err, results) => {
    if (err) {
      console.error("GET NOTIFICATIONS ERROR:", err);
      return res.status(500).json({
        message: "Error fetching notifications"
      });
    }

    res.status(200).json(results);
  });
};
