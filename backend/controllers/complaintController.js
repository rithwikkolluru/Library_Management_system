const db = require("../config/db");

// ➕ Add Complaint
exports.addComplaint = (req, res) => {
  const { user_id, role, message } = req.body;

  if (!user_id || !role || !message?.trim()) {
    return res.status(400).json({
      message: "user_id, role, and message are required"
    });
  }

  const sql = `
    INSERT INTO Complaints (user_id, role, message, status)
    VALUES (?, ?, ?, 'pending')
  `;

  db.query(sql, [user_id, role, message], (err, result) => {
    if (err) {
      console.error("ADD COMPLAINT ERROR:", err);
      return res.status(500).json({
        message: "Error adding complaint"
      });
    }

    res.status(201).json({
      message: "⚠️ Complaint submitted",
      complaint_id: result.insertId
    });
  });
};

// 📄 Get All Complaints (Admin)
exports.getComplaints = (req, res) => {
  const sql = `
    SELECT complaint_id, user_id, role, message, status
    FROM Complaints
    ORDER BY complaint_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET COMPLAINT ERROR:", err);
      return res.status(500).json({
        message: "Error fetching complaints"
      });
    }

    res.status(200).json(results);
  });
};

// 🔄 Resolve Complaint
exports.updateComplaintStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({
      message: "Complaint ID and status required"
    });
  }

  const sql = `
    UPDATE Complaints
    SET status = ?
    WHERE complaint_id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("UPDATE COMPLAINT ERROR:", err);
      return res.status(500).json({
        message: "Error updating complaint"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json({
      message: `Complaint marked as ${status}`
    });
  });
};