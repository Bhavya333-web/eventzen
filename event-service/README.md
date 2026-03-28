# Event & Vendor Service

> **EventZen Microservice** | Node.js + Express.js + MongoDB

## Overview
This microservice handles all **Event Management** and **Vendor Management** operations. It uses MongoDB for flexible document storage and follows RESTful API conventions.

## Tech Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MongoDB 6.0 via Mongoose ODM
- **Port:** 5002

## Folder Structure
```
event-service/
├── models/
│   ├── Event.js        # Event MongoDB schema
│   └── Vendor.js       # Vendor MongoDB schema
├── controllers/
│   ├── eventController.js   # Event CRUD logic
│   └── vendorController.js  # Vendor CRUD logic
├── routes/
│   ├── eventRoutes.js   # Event API routes
│   └── vendorRoutes.js  # Vendor API routes
├── .env                 # Environment config
├── index.js             # App entry point
└── Dockerfile           # Container config
```

## API Endpoints

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create new event |
| GET | `/api/events/:id` | Get event by ID |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### Vendors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | Get all vendors |
| POST | `/api/vendors` | Create vendor |
| PUT | `/api/vendors/:id` | Update vendor |
| DELETE | `/api/vendors/:id` | Delete vendor |

## Environment Variables
```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/eventzen_events
```

## Run Locally
```bash
npm install
node index.js
```