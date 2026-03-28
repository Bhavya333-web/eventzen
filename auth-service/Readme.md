# Auth Service – EventZen

> Microservice: User Authentication & Authorization
> Technology: Node.js + Express.js + MySQL + JWT

## Responsibility
Handles all user-related operations including registration, login, JWT token generation, and user management.

## Port: 5001

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/users` | Get all users (Admin only) |

## Folder Structure
```
auth-service/
├── config/
│   └── db.js          # MySQL database connection with retry logic
├── controllers/
│   └── authController.js  # Register, Login, GetUsers logic
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
├── routes/
│   └── authRoutes.js  # Route definitions
├── .env               # Environment variables
├── index.js           # App entry point
└── Dockerfile         # Container configuration
```

## Environment Variables
```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=eventzen_auth
JWT_SECRET=eventzen_secret_key_2025
ADMIN_CODE=EVENTZEN@ADMIN2025
```

## Run Locally
```bash
npm install
node index.js
```