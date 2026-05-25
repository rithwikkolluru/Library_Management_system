const express = require("express");
const router = express.Router();

const {
  borrowBook,
  getBorrows,
  returnBook
} = require("../controllers/borrowController");

// 📖 Borrow book
router.post("/", borrowBook);

// 📋 Get all borrow records
router.get("/", getBorrows);

// 🔄 Return book
router.put("/return", returnBook);

module.exports = router;