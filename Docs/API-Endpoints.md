# 📡 API Endpoints – EventZen

> Complete REST API Reference for all EventZen Microservices

---

## Base URLs

| Service | Base URL | Technology |
|---------|----------|-----------|
| Auth Service | `http://localhost:5001` | Node.js + MySQL |
| Event & Vendor Service | `http://localhost:5002` | Node.js + MongoDB |
| Attendee Service | `http://localhost:5172` | .NET 8 + MongoDB |
| Budget Service | `http://localhost:5003` | Spring Boot + MongoDB |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To get a token, call the Login endpoint first.

---

## 🔐 Auth Service (Port 5001)

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "Bhavya Mittal",
  "email": "bhavya@example.com",
  "password": "Pass123",
  "role": "admin",
  "adminCode": "EVENTZEN@ADMIN2025"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "message": "Email already exists"
}
```

**Error Response (403):**
```json
{
  "message": "Invalid admin code!"
}
```

---

### POST /api/auth/login
Login and receive JWT token.

**Request Body:**
```json
{
  "email": "bhavya@example.com",
  "password": "Pass123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Bhavya Mittal",
    "email": "bhavya@example.com",
    "role": "admin"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User not found"
}
```

---

### GET /api/auth/users
Get all registered users. **Requires JWT token (Admin only).**

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "Bhavya Mittal",
    "email": "bhavya@example.com",
    "role": "admin",
    "created_at": "2026-03-22T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Akshat Mittal",
    "email": "akshat@example.com",
    "role": "user",
    "created_at": "2026-03-22T11:00:00.000Z"
  }
]
```

---

## 🎯 Event Service (Port 5002)

### GET /api/events
Get all events.

**Success Response (200):**
```json
[
  {
    "_id": "69bfca24734ec445f33cef4e",
    "title": "Tech Conference 2025",
    "description": "Annual technology conference",
    "date": "2025-06-15T00:00:00.000Z",
    "venue": "Mumbai Convention Center",
    "capacity": 500,
    "status": "upcoming",
    "createdAt": "2026-03-22T10:53:24.660Z"
  }
]
```

---

### POST /api/events
Create a new event. **Requires JWT token.**

**Request Body:**
```json
{
  "title": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-06-15",
  "venue": "Mumbai Convention Center",
  "capacity": 500,
  "status": "upcoming"
}
```

**Success Response (201):**
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "69bfca24734ec445f33cef4e",
    "title": "Tech Conference 2025",
    "status": "upcoming"
  }
}
```

---

### GET /api/events/:id
Get a single event by ID.

**Success Response (200):**
```json
{
  "_id": "69bfca24734ec445f33cef4e",
  "title": "Tech Conference 2025",
  "venue": "Mumbai Convention Center",
  "capacity": 500,
  "status": "upcoming"
}
```

**Error Response (404):**
```json
{
  "message": "Event not found"
}
```

---

### PUT /api/events/:id
Update an existing event. **Requires JWT token.**

**Request Body:**
```json
{
  "title": "Tech Conference 2025 – Updated",
  "status": "ongoing"
}
```

**Success Response (200):**
```json
{
  "message": "Event updated successfully",
  "event": { ... }
}
```

---

### DELETE /api/events/:id
Delete an event. **Requires JWT token.**

**Success Response (200):**
```json
{
  "message": "Event deleted successfully"
}
```

---

## 🏪 Vendor Service (Port 5002)

### GET /api/vendors
Get all vendors.

**Success Response (200):**
```json
[
  {
    "_id": "abc123",
    "name": "Tasty Caterers",
    "category": "Catering",
    "phone": "9876543210",
    "email": "caterers@example.com",
    "price": 25000,
    "eventId": "69bfca24...",
    "status": "active"
  }
]
```

---

### POST /api/vendors
Create a new vendor. **Requires JWT token.**

**Request Body:**
```json
{
  "name": "Tasty Caterers",
  "category": "Catering",
  "phone": "9876543210",
  "email": "caterers@example.com",
  "price": 25000,
  "eventId": "69bfca24734ec445f33cef4e",
  "status": "active",
  "notes": "Specializes in Indian cuisine"
}
```

**Success Response (201):**
```json
{
  "_id": "abc123",
  "name": "Tasty Caterers",
  "category": "Catering",
  "status": "active"
}
```

---

### PUT /api/vendors/:id
Update vendor details. **Requires JWT token.**

---

### DELETE /api/vendors/:id
Delete a vendor. **Requires JWT token.**

---

## 👥 Attendee Service (Port 5172)

### GET /api/attendee/event/{eventId}
Get all attendees registered for a specific event.

**Success Response (200):**
```json
[
  {
    "id": "69bfd1f9364d922ef2107a54",
    "name": "Bhavya Mittal",
    "email": "bhavya@gmail.com",
    "eventId": "69bfca24734ec445f33cef4e",
    "status": "registered",
    "registeredAt": "2026-03-22T11:26:49.071Z"
  }
]
```

---

### POST /api/attendee
Register an attendee for an event.

**Request Body:**
```json
{
  "name": "Bhavya Mittal",
  "email": "bhavya@gmail.com",
  "eventId": "69bfca24734ec445f33cef4e"
}
```

**Success Response (200):**
```json
{
  "id": "69bfd1f9364d922ef2107a54",
  "name": "Bhavya Mittal",
  "email": "bhavya@gmail.com",
  "eventId": "69bfca24734ec445f33cef4e",
  "status": "registered",
  "registeredAt": "2026-03-22T11:26:49.071Z"
}
```

---

### DELETE /api/attendee/{id}
Remove an attendee. **Requires JWT token.**

**Success Response (200):** Empty response with 200 OK

---

## 💰 Budget Service (Port 5003)

### POST /api/budget
Create a budget for an event. **Requires JWT token.**

**Request Body:**
```json
{
  "eventId": "69bfca24734ec445f33cef4e",
  "totalBudget": 50000,
  "expenses": []
}
```

**Success Response (200):**
```json
{
  "id": "69c04e61022d40ce2d40ebfc",
  "eventId": "69bfca24734ec445f33cef4e",
  "totalBudget": 50000.0,
  "expenses": []
}
```

---

### GET /api/budget/{eventId}
Get budget details for a specific event. **Requires JWT token.**

**Success Response (200):**
```json
{
  "id": "69c04e61022d40ce2d40ebfc",
  "eventId": "69bfca24734ec445f33cef4e",
  "totalBudget": 50000.0,
  "expenses": [
    {
      "name": "Venue Booking",
      "amount": 15000.0,
      "category": "venue"
    },
    {
      "name": "Catering",
      "amount": 10000.0,
      "category": "catering"
    }
  ]
}
```

---

### POST /api/budget/{eventId}/expense
Add an expense to event budget. **Requires JWT token.**

**Request Body:**
```json
{
  "name": "Venue Booking",
  "amount": 15000,
  "category": "venue"
}
```

**Success Response (200):**
```json
{
  "id": "69c04e61022d40ce2d40ebfc",
  "eventId": "69bfca24734ec445f33cef4e",
  "totalBudget": 50000.0,
  "expenses": [
    {
      "name": "Venue Booking",
      "amount": 15000.0,
      "category": "venue"
    }
  ]
}
```

---

## HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | OK – Request successful |
| 201 | Created – Resource created |
| 400 | Bad Request – Invalid data |
| 401 | Unauthorized – No/invalid token |
| 403 | Forbidden – Insufficient permissions |
| 404 | Not Found – Resource doesn't exist |
| 500 | Server Error – Internal error |

---

*EventZen API Reference | Bhavya Mittal | Deloitte Training 2025-26*