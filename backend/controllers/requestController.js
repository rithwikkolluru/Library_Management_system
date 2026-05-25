const db = require("../config/db");

// 📩 Create request
exports.createRequest = (req, res) => {
  const { member_id, book_id } = req.body;

  if (!member_id || !book_id) {
    return res.status(400).json({ message: "Member ID and Book ID required" });
  }

  const sql = `
    INSERT INTO SendRequest (member_id, book_id, request_type, status, request_date)
    VALUES (?, ?, 'borrow', 'pending', CURDATE())
  `;

  db.query(sql, [member_id, book_id], (err) => {
    if (err) {
      console.error("CREATE REQUEST ERROR:", err);
      return res.status(500).json({ message: "Error sending borrow request" });
    }
    res.json({ message: "Request sent successfully" });
  });
};

// 📋 GET Requests (👉 ADD THIS)
exports.getRequests = (req, res) => {
  const sql = `
    SELECT r.request_id, r.member_id, r.book_id, r.status,
           b.title
    FROM SendRequest r
    JOIN Books b ON r.book_id = b.book_id
    WHERE r.status = 'pending'
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// ✅ Approve Request (sequential queries using callbacks)
exports.approveRequest = (req, res) => {
  const { request_id, member_id, book_id } = req.body;

  // 1. Check if book available
  db.query("SELECT quantity FROM Books WHERE book_id = ?", [book_id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (!result.length || result[0].quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // 2. Insert into Borrows
    db.query("INSERT INTO Borrows (member_id, book_id, issue_date) VALUES (?, ?, NOW())", [member_id, book_id], (err2) => {
      if (err2) return res.status(500).send(err2);

      // 3. Decrement Book Quantity
      db.query("UPDATE Books SET quantity = quantity - 1 WHERE book_id = ?", [book_id], (err3) => {
        if (err3) return res.status(500).send(err3);

        // 4. Update Request Status
        db.query("UPDATE SendRequest SET status = 'approved' WHERE request_id = ?", [request_id], (err4) => {
          if (err4) return res.status(500).send(err4);

          res.json({ message: "Book issued successfully" });
        });
      });
    });
  });
};

// 📋 Get requests by member ID
exports.getRequestsByMember = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT r.request_id, r.member_id, r.book_id, r.status, r.request_date,
           b.title
    FROM SendRequest r
    JOIN Books b ON r.book_id = b.book_id
    WHERE r.member_id = ?
    ORDER BY r.request_date DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("GET MEMBER REQUESTS ERROR:", err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
};