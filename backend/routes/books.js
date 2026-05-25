const express = require("express");
const router = express.Router();

const {
  getBooks,
  addBook,
  deleteBook,
  linkAuthor
} = require("../controllers/bookController");

router.get("/", getBooks);
router.post("/", addBook);
router.post("/link", linkAuthor);
router.delete("/:id", deleteBook);

module.exports = router;