# Admin Panel Backend (RBAC + WhatsApp Management)

A scalable backend API built using Node.js, Express, and MongoDB (Mongoose).  
This project implements Role-Based Access Control (RBAC) with user management and WhatsApp number handling.

---

## Features

- User Authentication (JWT)
- Role-Based Access Control (RBAC)
- Permission-based authorization
- Multiple WhatsApp numbers per user
- Secure APIs using middleware
- Cascade delete (User → WhatsApp numbers)
- Clean architecture (Controller → Service → Repository)
- Input validation and centralized error handling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## Project Structure
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── utils/
└── app.js


---

## Authentication

1. Register a user  
2. Login to receive JWT token  
3. Use token in headers for protected routes  


---

## RBAC Flow

- User is assigned a role  
- Role contains permissions  
- Middleware checks permissions before allowing access  

Example:
roleMiddleware("DELETE_USER")
---

## API Endpoints

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users/register | Register user |
| POST | /users/login | Login |
| GET | /users/profile | Get profile |
| GET | /users | Get all users |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

---

### Role

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /roles | Create role |
| GET | /roles | Get all roles |
| PUT | /roles/:id | Update role |
| PATCH | /roles/:id/remove-permission | Remove permission |
| DELETE | /roles/:id | Delete role |

---

### WhatsApp

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /whatsapp | Add number |
| GET | /whatsapp | Get numbers |
| DELETE | /whatsapp/:id | Delete number |

---

## Special Features

### Cascade Delete
When a user is deleted, all associated WhatsApp numbers are automatically deleted using Mongoose middleware.

### Secure Deletion
Users can only delete their own WhatsApp numbers.

### Optimized Queries
Aggregation is used to fetch users with roles and WhatsApp numbers efficiently.

---

## Setup Instructions

### Clone Repository
git clone https://github.com/sourinry/admin-panel-backend.git
cd admin-panel-backend


---

### Install Dependencies
npm i


---

### Create .env file
PORT=8080
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


---

### Run Server
npm run dev


---

## Testing

You can test the APIs using Postman or any API testing tool.

---

## Future Improvements

- Refresh token system
- Pagination and search
- File upload support
- Audit logs
- Soft delete

---

## Author

Sourin Roy  
Backend Developer (Node.js)