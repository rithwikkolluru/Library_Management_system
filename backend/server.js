const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use("/books", require("./routes/books"));
app.use("/members", require("./routes/members"));
app.use("/borrow", require("./routes/borrow"));
app.use("/employees", require("./routes/employees"));     // ✅ add this
app.use("/complaints", require("./routes/complaints"));   // ✅ add this
app.use("/requests", require("./routes/requests"));       // ✅ add this
app.use("/authors", require("./routes/authors"));         // ✅ add this
app.use("/notifications", require("./routes/notifications")); // ✅ add this
app.use("/publishers", require("./routes/publisher"));

// ✅ Root check (optional but useful)
app.get("/", (req, res) => {
  res.send("🚀 Library Management Backend Running");
});

// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});