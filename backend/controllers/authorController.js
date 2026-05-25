const db = require("../config/db");

// ➕ Add new author
exports.addAuthor = (req, res) => {
    const { name, email } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Author name is required" });
    }

    const sql = "INSERT INTO Author (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            message: "Author added successfully",
            author_id: result.insertId
        });
    });
};

// 📋 Get all authors
exports.getAuthors = (req, res) => {
    db.query("SELECT * FROM Author", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json(result);
    });
};
