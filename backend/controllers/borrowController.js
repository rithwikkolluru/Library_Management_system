const db = require("../config/db");

// 📖 Borrow Book
exports.borrowBook = (req, res) => {
  const { member_id, book_id, issue_date } = req.body;

  if (!member_id || !book_id) {
    return res.status(400).json({ message: "member_id and book_id are required" });
  }

  const formattedDate = issue_date ? new Date(issue_date) : new Date();

  // 1. Check if book available (not already issued and quantity > 0)
  db.query("SELECT quantity FROM Books WHERE book_id = ?", [book_id], (err, bRes) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (bRes.length === 0) return res.status(404).json({ message: "Book not found" });
    if (bRes[0].quantity <= 0) return res.status(400).json({ message: "Book out of stock" });

    // 2. Check if member exists
    db.query("SELECT * FROM Member WHERE member_id = ?", [member_id], (mErr, mRes) => {
      if (mErr) return res.status(500).json({ message: "Database error" });
      if (mRes.length === 0) return res.status(404).json({ message: "Member not found" });

      // 3. Insert into Borrows
      db.query("INSERT INTO Borrows (member_id, book_id, issue_date) VALUES (?, ?, ?)", [member_id, book_id, formattedDate], (err2) => {
        if (err2) return res.status(500).json({ message: "Error borrowing book" });

        // 4. Decrement Quantity
        db.query("UPDATE Books SET quantity = quantity - 1 WHERE book_id = ?", [book_id], (err3) => {
          if (err3) return res.status(500).json({ message: "Error updating quantity" });

          res.status(201).json({ message: "📖 Book issued successfully" });
        });
      });
    });
  });
};

// 📋 Get All Borrow Records
exports.getBorrows = (req, res) => {
  const sql = `
    SELECT b.borrow_id, m.name AS member, bk.title AS book, b.issue_date, b.return_date, b.fine
    FROM Borrows b
    JOIN Member m ON b.member_id = m.member_id
    JOIN Books bk ON b.book_id = bk.book_id
    ORDER BY b.borrow_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching records" });
    res.json(result);
  });
};

// 🔄 Return Book
exports.returnBook = (req, res) => {
  const { member_id, book_id } = req.body;

  if (!member_id || !book_id) {
    return res.status(400).json({ message: "member_id and book_id required" });
  }

  // 1. Update Borrows Table
  const sql = `
    UPDATE Borrows
    SET return_date = NOW()
    WHERE member_id = ? AND book_id = ? AND return_date IS NULL
  `;

  db.query(sql, [member_id, book_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error returning book" });

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No active borrow found" });
    }

    // 2. Increment Books Quantity
    db.query("UPDATE Books SET quantity = quantity + 1 WHERE book_id = ?", [book_id], (err2) => {
      if (err2) return res.status(500).json({ message: "Error updating stock" });

      res.json({ message: "🔄 Book returned successfully" });
    });
  });
};