# Admin Panel Backend (RBAC + WhatsApp Management)

A scalable backend API built using Node.js, Express, and MongoDB (Mongoose).
This project implements Role-Based Access Control (RBAC) with user management and WhatsApp number handling, including admin-level controls.

---

## Features

* User Authentication (JWT)
* Role-Based Access Control (RBAC)
* Permission-based authorization
* Multiple WhatsApp numbers per user
* Admin can manage any user's WhatsApp numbers
* Secure APIs using middleware
* Cascade delete (User → WhatsApp numbers)
* Clean architecture (Controller → Service → Repository)
* Input validation and centralized error handling

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

---

## Project Structure

```
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── utils/
└── app.js
```

---

## Authentication

1. Register a user
2. Login to receive JWT token
3. Use token in headers for protected routes

```
Authorization: Bearer <token>
```

---

## RBAC Flow

* User is assigned a role
* Role contains permissions
* Middleware checks permissions before allowing access

Example:

```
roleMiddleware("DELETE_USER")
```

---

## API Endpoints

### User

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | /user/register | Register user              |
| POST   | /user/login    | Login                      |
| GET    | /user/profile  | Get profile                |
| GET    | /user          | Get all users (Admin only) |
| PUT    | /user/:id      | Update user (Self/Admin)   |
| DELETE | /user/:id      | Delete user (Admin only)   |

---

### Role

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | /role            | Create role (Admin only)   |
| GET    | /role            | Get all roles (Admin only) |
| GET    | /role/:id        | Get role by ID             |
| PUT    | /role/:id        | Update role                |
| PATCH  | /role/:id/remove | Remove permission          |
| DELETE | /role/:id        | Delete role                |

---

### WhatsApp (User)

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /whatsapp     | Add own number    |
| GET    | /whatsapp     | Get own numbers   |
| DELETE | /whatsapp/:id | Delete own number |

---

### WhatsApp (Admin)

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /whatsapp/admin/:userId | Add number to any user |
| GET    | /whatsapp/admin/:userId | Get any user's numbers |
| PUT    | /whatsapp/admin/:id     | Update any number      |
| DELETE | /whatsapp/admin/:id     | Delete any number      |

---

## Special Features

### Cascade Delete

When a user is deleted, all associated WhatsApp numbers are automatically deleted using Mongoose middleware.

### Secure Access Control

* Users can only manage their own data
* Admin can manage all users and their WhatsApp numbers

### Optimized Queries

Population and structured queries are used to fetch related data efficiently.

---

## Setup Instructions

### Clone Repository

```
git clone https://github.com/sourinry/admin-panel-backend.git
cd admin-panel-backend
```

---

### Install Dependencies

```
npm install
```

---

### Create .env file

```
PORT=8080
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

### Run Server

```
npm run dev
```

---

## Testing

You can test APIs using Postman or any API testing tool.

---

## Future Improvements

* Refresh token system
* Pagination and filtering
* Search functionality
* File upload support
* Audit logs (admin actions tracking)
* Soft delete implementation

---

## Author

Sourin Roy
Backend Developer (Node.js)
