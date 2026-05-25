const db = require("../config/db");

exports.addPublisher = (req, res) => {
    const { name, country } = req.body;
    const query = "INSERT INTO Publisher (name, country) VALUES (?, ?)";
    db.query(query, [name, country], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Publisher Added", publisher_id: result.insertId });
    });
};

exports.getPublishers = (req, res) => {
    const query = "SELECT * FROM Publisher";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};
