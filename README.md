#  Library Management System

This Full-Stack **Library Management System** is a comprehensive, role-based web application designed to streamline library operations, automate book tracking, and enhance communication between library staff and members. Built using the robust **PERN/MERN-variant stack (React, Node.js, Express, and MySQL)**, the platform replaces traditional ledger-based tracking with a secure, relational database system.The application implements strict Role-Based Access Control (RBAC) across three distinct user dimensions: Admin, Employee, and Member. Each role is greeted with a tailored dashboard that optimizes their unique workflow, from macro-level system administration to micro-level book browsing.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [User Roles & Workflows](#user-roles--workflows)
- [API Overview](#api-overview)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## Features

**Admin**
- Create and manage Employee and Member accounts
- Full system oversight and user management

**Employee**
- Add and manage Authors
- Add and manage Books
- Link Authors to Books
- Handle Member borrow requests and returns
- View and manage Member complaints

**Member**
- Browse the book catalog
- Send borrow requests for available books
- View borrowing history
- Submit complaints

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React.js (Create React App) |
| Backend    | Node.js, Express.js         |
| Database   | MySQL                       |
| Styling    | CSS / React Components      |

---

## Project Structure

```
Library_Management_system/
├── backend/
│   ├── config/
│   │   └── db.js                  # MySQL database connection
│   ├── controllers/
│   │   ├── borrowController.js    # Borrow/return logic & stock management
│   │   ├── bookController.js
│   │   ├── authorController.js
│   │   ├── memberController.js
│   │   └── complaintController.js
│   ├── routes/
│   │   └── ...                    # Express route definitions
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminPage.js       # Admin dashboard
│   │   │   ├── EmployeePage.js    # Employee dashboard
│   │   │   └── MemberPage.js      # Member dashboard
│   │   ├── components/
│   │   └── App.js
│   └── package.json
└── PROJECT_GUIDE.txt
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) (v8+)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rithwikkolluru/Library_Management_system.git
cd Library_Management_system
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Database Setup

Open your MySQL terminal and run the following to initialize the schema and seed your first Admin account:

```sql
-- (Create your database and tables per your schema first)

-- Reset all tables (useful for a fresh start)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE WrittenBy;
TRUNCATE TABLE Borrows;
TRUNCATE TABLE SendRequest;
TRUNCATE TABLE Complaints;
TRUNCATE TABLE Member;
TRUNCATE TABLE Author;
TRUNCATE TABLE Employee;
TRUNCATE TABLE Admin;
TRUNCATE TABLE Books;
SET FOREIGN_KEY_CHECKS = 1;

-- Seed the first Admin account
INSERT INTO Admin (name, email) VALUES ('System Admin', 'admin@library.com');
```

Then update the database credentials in `backend/config/db.js`:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'library_db'
});
```

### Running the Application

**Start the backend** (runs on `http://localhost:5000`):

```bash
cd backend
npm start
```

**Start the frontend** (runs on `http://localhost:3000`):

```bash
cd frontend
npm start
```

Open your browser and navigate to `http://localhost:3000`.

---

## User Roles & Workflows

### Recommended Order of Operations

To avoid missing/unknown data in your books, follow this sequence:

1. **Login as Admin** → Create your first Employee and Member accounts.

2. **Login as Employee:**
   - Go to **Author Management** → Add an Author.
   - Go to **Book Management** → Add a Book.
   - Use **Link Author to Book** → Select the Author and Book, then click "Link Them".

3. **Login as Member** → Browse books, send borrow requests, and track history.

### Default Login Info

| Role     | ID / Credential              |
|----------|------------------------------|
| Admin    | ID: `1`, Email: `admin@library.com` |
| Employee | Created via Admin Page       |
| Member   | Created via Admin Page       |

---

## API Overview

All API routes are served from `http://localhost:5000`.

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/api/books`              | Fetch all books                |
| POST   | `/api/books`              | Add a new book                 |
| GET    | `/api/authors`            | Fetch all authors              |
| POST   | `/api/authors`            | Add a new author               |
| POST   | `/api/writtenby`          | Link an author to a book       |
| GET    | `/api/members`            | Fetch all members              |
| POST   | `/api/members`            | Add a new member               |
| POST   | `/api/borrow/request`     | Member sends a borrow request  |
| POST   | `/api/borrow/approve`     | Employee approves request      |
| POST   | `/api/borrow/return`      | Process a book return          |
| GET    | `/api/complaints`         | View complaints                |
| POST   | `/api/complaints`         | Submit a complaint             |

---

## Database Schema

The MySQL schema consists of the following tables:

| Table         | Description                                      |
|---------------|--------------------------------------------------|
| `Admin`       | Stores admin accounts                            |
| `Employee`    | Stores employee accounts                         |
| `Member`      | Stores library member accounts                   |
| `Books`       | Stores book details (title, stock, etc.)         |
| `Author`      | Stores author details                            |
| `WrittenBy`   | Many-to-many link between Authors and Books      |
| `Borrows`     | Tracks active and past borrow records            |
| `SendRequest` | Tracks member borrow requests                    |
| `Complaints`  | Stores complaints submitted by members           |

**Bulk link books to authors via SQL** (useful for seeding data):

```sql
INSERT IGNORE INTO WrittenBy (author_id, book_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6);
```

---

## Configuration

| File                              | Purpose                          |
|-----------------------------------|----------------------------------|
| `backend/config/db.js`            | MySQL connection settings        |
| `frontend/src/pages/AdminPage.js` | Admin dashboard logic            |
| `frontend/src/pages/EmployeePage.js` | Employee operations           |
| `backend/controllers/borrowController.js` | Borrow/return & stock logic |

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

> Built by [Rithwik Kolluru](https://github.com/rithwikkolluru)
