const db = require("../config/db");

// 📚 Get Books (with Author names and Publisher info)
exports.getBooks = (req, res) => {
  const sql = `
    SELECT b.book_id, b.title, b.quantity, b.publisher_id,
           GROUP_CONCAT(a.name SEPARATOR ', ') as author,
           p.name as publisher_name, p.country as publisher_country
    FROM Books b
    LEFT JOIN WrittenBy wb ON b.book_id = wb.book_id
    LEFT JOIN Author a ON wb.author_id = a.author_id
    LEFT JOIN Publisher p ON b.publisher_id = p.publisher_id
    GROUP BY b.book_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(result);
  });
};

// ➕ Add Book
exports.addBook = (req, res) => {
  const { title, quantity, publisher_id } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const book_id = Math.floor(1000000 + Math.random() * 9000000);
  const qty = quantity || 1; 

  const sql = "INSERT INTO Books (book_id, title, quantity, publisher_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [book_id, title, qty, publisher_id || null], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error adding book" });
    }

    res.status(201).json({
      message: "Book added",
      book_id
    });
  });
};

// ❌ Delete Book
exports.deleteBook = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Books WHERE book_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting book" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  });
};

// 🔗 Link Author to Book
exports.linkAuthor = (req, res) => {
  const { book_id, author_id } = req.body;

  if (!book_id || !author_id) {
    return res.status(400).json({ message: "Book ID and Author ID required" });
  }

  const sql = "INSERT INTO WrittenBy (book_id, author_id) VALUES (?, ?)";

  db.query(sql, [book_id, author_id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error linking author" });
    }
    res.json({ message: "✅ Author linked to book" });
  });
};