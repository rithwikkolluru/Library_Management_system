const express = require("express");
const router = express.Router();
const { addAuthor, getAuthors } = require("../controllers/authorController");

router.post("/", addAuthor);
router.get("/", getAuthors);

module.exports = router;
