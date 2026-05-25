const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");

router.post("/", publisherController.addPublisher);
router.get("/", publisherController.getPublishers);

module.exports = router;
