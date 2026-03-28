# EventZen – Event Management System

> **Capstone Project | Full Stack Development | Deloitte Training Program**
> Developed by: Bhavya Mittal | Trainer: Vishwas K Singh, SME-FSD

---

## Project Overview

EventZen is a comprehensive **Event Management Platform** built using a **Microservices Architecture**. It enables event planning companies to efficiently manage events, attendees, budgets, and vendors through a modern, role-based web application.

### Problem Statement
EventZen addresses the challenges faced by event planning companies:
- Manual and error-prone event scheduling
- Inefficient attendee management
- Complex budget tracking
- Limited customer engagement platform

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Framer Motion, Recharts |
| Auth Service | Node.js, Express.js, MySQL, JWT |
| Event & Vendor Service | Node.js, Express.js, MongoDB |
| Attendee Service | .NET 8, ASP.NET Core Web API, MongoDB |
| Budget Service | Spring Boot 3.x, Java 21, MongoDB |
| Databases | MySQL 8.0, MongoDB 6.0 |
| DevOps | Docker, Docker Compose |
| Version Control | GitHub |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              React Frontend (Port 3000)          │
└──────────────────────┬──────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌───▼──────────┐
│ Auth Service │ │Event Service│ │Attendee Svc  │
│ Node.js+MySQL│ │Node.js+Mongo│ │.NET + MongoDB│
│  Port: 5001  │ │  Port: 5002 │ │  Port: 5172  │
└──────────────┘ └─────────────┘ └──────────────┘
                       │
               ┌───────▼───────┐
               │ Budget Service │
               │Spring Boot+Mongo│
               │   Port: 5003   │
               └───────────────┘
```

---

## Modules

### 1. User Module (Authentication)
- User Registration with role selection (Admin / Regular User)
- JWT-based Login & Authorization
- Role-Based Access Control (Admin Portal / User Portal)
- Admin Secret Code protection

### 2. Event Management Module
- Create, Read, Update, Delete Events
- Event status tracking (Upcoming / Ongoing / Completed)
- Search and filter events
- Venue and capacity management

### 3. Attendee Management Module
- Register attendees for events
- View attendee list per event
- Duplicate booking prevention
- Remove attendees

### 4. Budget Tracking Module
- Set total budget per event
- Add categorized expenses (Venue, Catering, Decoration, etc.)
- Real-time remaining budget calculation
- Visual progress tracking

### 5. Vendor Management Module
- Add and manage vendors
- Categorize vendors by type
- Assign vendors to specific events
- Track vendor pricing

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Docker Desktop | Latest |
| Git | Latest |

> **Docker is the recommended way to run this project.**

---

## Running with Docker (Recommended)

```bash
# Step 1: Clone the repository
git clone https://github.com/Bhavya333-web/eventzen.git
cd eventzen

# Step 2: Start all services
docker-compose up --build

# Step 3: Open browser
# Visit: http://localhost:3000
```

> **First time setup:** After Docker starts, go to `/register` and create an Admin account using the Admin Secret Code.

### Stop the application
```bash
docker-compose down
```

---

## Running Without Docker

### Prerequisites
- Node.js v18+
- .NET SDK 8.0
- Java 21
- MongoDB (running locally)
- MySQL 8.0 (running locally)

### Terminal 1 – Auth + Event Services + Frontend
```bash
cd eventzen
npm install
# Windows PowerShell:
$env:PATH += ";D:\MySQL\MySQL Server 8.0\bin"
npm run dev
```

### Terminal 2 – Attendee Service (.NET)
```bash
cd eventzen/attendee-service/AttendeeService
dotnet run
```

### Terminal 3 – Budget Service (Spring Boot)
```bash
cd eventzen/budget-service
./mvnw spring-boot:run
# Windows:
.\mvnw spring-boot:run
```

### Open Browser
```
http://localhost:3000
```

---

## Service Ports

| Service | Port | Technology |
|---------|------|-----------|
| React Frontend | 3000 | React.js |
| Auth Service | 5001 | Node.js + MySQL |
| Event & Vendor Service | 5002 | Node.js + MongoDB |
| Attendee Service | 5172 | .NET 8 |
| Budget Service | 5003 | Spring Boot |
| MySQL | 3306 | MySQL 8.0 |
| MongoDB | 27017 | MongoDB 6.0 |

---

## Default Credentials

### Admin Login
> Register first at `/register` with:
- Account Type: **Admin**
- Admin Secret Code: **`EVENTZEN@ADMIN2025`**

### Regular User
> Register at `/register` with:
- Account Type: **Regular User**
- No secret code required

---

## API Endpoints

### Auth Service (Port 5001)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get JWT token | No |
| GET | `/api/auth/users` | Get all users | Yes (Admin) |

### Event Service (Port 5002)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/events` | Get all events | No |
| POST | `/api/events` | Create new event | Yes |
| PUT | `/api/events/:id` | Update event | Yes |
| DELETE | `/api/events/:id` | Delete event | Yes |
| GET | `/api/vendors` | Get all vendors | No |
| POST | `/api/vendors` | Create vendor | Yes |
| PUT | `/api/vendors/:id` | Update vendor | Yes |
| DELETE | `/api/vendors/:id` | Delete vendor | Yes |

### Attendee Service (Port 5172)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/attendee/event/{eventId}` | Get attendees by event | No |
| POST | `/api/attendee` | Register attendee | No |
| DELETE | `/api/attendee/{id}` | Remove attendee | Yes |

### Budget Service (Port 5003)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/budget` | Create budget for event | Yes |
| GET | `/api/budget/{eventId}` | Get budget by event | Yes |
| POST | `/api/budget/{eventId}/expense` | Add expense | Yes |

---

## Frontend Pages & URLs

### Admin Portal

| Page | URL | Description |
|------|-----|-------------|
| Login | `/login` | Admin/User login page |
| Register | `/register` | Create new account |
| Dashboard | `/` | Stats, charts, overview |
| Events | `/events` | Manage all events |
| Attendees | `/attendees` | Manage event attendees |
| Budget | `/budget` | Track event budgets |
| Vendors | `/vendors` | Manage vendors |
| Users | `/users` | View all registered users |

### Customer Portal

| Page | URL | Description |
|------|-----|-------------|
| Home | `/user` | Browse & book events |
| My Bookings | `/user/bookings` | View registered events |
| Profile | `/user/profile` | Account information |

---

## Project Structure

```
eventzen/
├── frontend/                 # React.js Frontend
│   ├── src/
│   │   ├── components/      # Reusable components (Layout, UserLayout)
│   │   ├── pages/           # Page components
│   │   │   ├── user/        # Customer portal pages
│   │   │   ├── Dashboard.js
│   │   │   ├── Events.js
│   │   │   ├── Attendees.js
│   │   │   ├── Budget.js
│   │   │   ├── Vendors.js
│   │   │   └── Users.js
│   │   ├── services/        # API service layer
│   │   └── context/         # Auth context
│   └── Dockerfile
│
├── auth-service/             # Node.js Auth Microservice
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # JWT middleware
│   └── Dockerfile
│
├── event-service/            # Node.js Event & Vendor Microservice
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   └── Dockerfile
│
├── attendee-service/         # .NET Attendee Microservice
│   └── AttendeeService/
│       ├── Controllers/     # API controllers
│       ├── Attendee.cs      # Data model
│       ├── AttendeeService.cs # Business logic
│       └── Dockerfile
│
├── budget-service/           # Spring Boot Budget Microservice
│   └── src/main/java/
│       └── com/eventzen/budgetservice/
│           ├── Budget.java          # Data model
│           ├── BudgetController.java # API controller
│           └── BudgetRepository.java # Data access
│
├── docker-compose.yml        # Docker orchestration
└── README.md                 # This file
```

---

## Docker Services

```yaml
Services started by docker-compose up:
  ✅ eventzen-mongodb    - MongoDB database
  ✅ eventzen-mysql      - MySQL database
  ✅ eventzen-auth       - Auth microservice
  ✅ eventzen-events     - Event & Vendor microservice
  ✅ eventzen-attendees  - Attendee microservice (.NET)
  ✅ eventzen-budget     - Budget microservice (Spring Boot)
  ✅ eventzen-frontend   - React frontend
```

---

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin / User)
- Admin secret code for privileged registration
- Password validation (min 6 chars, at least 1 number)
- Protected API endpoints with JWT middleware

---

## GitHub Repository

**Repository:** https://github.com/Bhavya333-web/eventzen

---

*EventZen – Streamlining Event Management with Modern Microservices*
