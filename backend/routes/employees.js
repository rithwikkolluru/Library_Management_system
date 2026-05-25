const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getEmployees
} = require("../controllers/employeeController");

// ➕ Add employee (Admin)
router.post("/", addEmployee);

// 📄 Get all employees
router.get("/", getEmployees);

module.exports = router;