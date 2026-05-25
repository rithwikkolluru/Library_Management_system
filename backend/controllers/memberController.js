const db = require("../config/db");

// ➕ Add new member
exports.addMember = (req, res) => {
    const { name, phone, address } = req.body;

    // Basic validation
    if (!name || !phone) {
        return res.status(400).json({ message: "Name and phone are required" });
    }

    const sql = "INSERT INTO Member (name, phone, address) VALUES (?, ?, ?)";

    db.query(sql, [name, phone, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            message: "Member added successfully",
            member_id: result.insertId
        });
    });
};


// 📋 Get all members
exports.getMembers = (req, res) => {
    db.query("SELECT * FROM Member", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json(result);
    });
};

// 👤 Get member by ID
exports.getMemberById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Member WHERE member_id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json(result[0]);
    });
};