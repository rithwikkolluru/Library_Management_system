const db = require("../config/db");

// ➕ Add Employee
exports.addEmployee = (req, res) => {
  const { employee_id, name, role, salary } = req.body;

  if (!employee_id || !name?.trim() || !role?.trim()) {
    return res.status(400).json({ message: "employee_id, name and role are required" });
  }

  const sql = `
    INSERT INTO Employee (employee_id, name, role, salary)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [employee_id, name, role, salary || 0], (err, result) => {
    if (err) {
      console.error("ADD EMPLOYEE ERROR:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Employee ID already exists" });
      }
      return res.status(500).json({ message: "Error adding employee: " + err.message });
    }

    res.status(201).json({
      message: "👷 Employee added successfully",
      employee_id
    });
  });
};

// 📄 Get All Employees
exports.getEmployees = (req, res) => {
  const sql = "SELECT employee_id, name, role FROM Employee";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET EMPLOYEE ERROR:", err);
      return res.status(500).json({ message: "Error fetching employees" });
    }
    res.json(results);
  });
};