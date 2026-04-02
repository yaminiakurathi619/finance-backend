# Finance Data Processing and Access Control Backend

## Overview

This project is a backend system for a finance dashboard that allows users to manage financial records and access data based on their roles.

## Features

### User Management

- Create users
- Assign roles (viewer, analyst, admin)
- Manage user status

### Financial Records

- Create, update, delete records
- Filter records by type and category

### Dashboard

- Total income
- Total expense
- Net balance

### Access Control

- Viewer → No access to records/dashboard
- Analyst → Can view records and dashboard
- Admin → Full access

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

---

## API Endpoints

### Users

- POST /users → Create user

### Records

- POST /records → Create record (Admin only)
- GET /records → View records (Admin, Analyst)
- PUT /records/:id → Update record (Admin)
- DELETE /records/:id → Delete record (Admin)

### Dashboard

- GET /dashboard/summary → View summary (Admin, Analyst)

---

## Role-Based Access

| Role    | Permissions              |
| ------- | ------------------------ |
| Viewer  | No access                |
| Analyst | View records & dashboard |
| Admin   | Full access              |

---

## Setup Instructions

1. Clone repository
2. Install dependencies:
   npm install

3. Run server:
   node server.js

---

## Database

MongoDB Atlas is used for cloud database.

---

## Notes

- Role-based access is implemented using middleware
- Request headers are used to simulate user roles
- Clean and simple backend architecture is followed

---

## Status

Project completed with all core features working successfully.

## Security Note

Database credentials were rotated after initial commit for security purposes.
