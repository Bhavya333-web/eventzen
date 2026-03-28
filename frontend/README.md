# Frontend – EventZen

> **React.js Application** | Role-Based Admin & Customer Portal

## Overview
The EventZen frontend is a modern **React.js** single-page application providing two distinct portals:
- **Admin Portal** — Full event management dashboard
- **Customer Portal** — Event browsing and booking

## Tech Stack
- **Framework:** React.js 18
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** React Icons (Material Design)
- **HTTP Client:** Axios
- **Routing:** React Router DOM v6
- **State Management:** React Context API
- **Port:** 3000

## Folder Structure
```
frontend/src/
├── components/
│   ├── Layout.js         # Admin sidebar layout
│   └── UserLayout.js     # Customer portal navbar layout
├── context/
│   └── AuthContext.js    # Global auth state (JWT, user, login/logout)
├── pages/
│   ├── Login.js          # Login page
│   ├── Register.js       # Registration with role selection
│   ├── Dashboard.js      # Admin dashboard with charts
│   ├── Events.js         # Event CRUD management
│   ├── Attendees.js      # Attendee management
│   ├── Budget.js         # Budget tracking
│   ├── Vendors.js        # Vendor management
│   ├── Users.js          # User management
│   └── user/
│       ├── UserHome.js       # Customer event browsing
│       ├── MyBookings.js     # Customer booking history
│       └── UserProfile.js    # Customer profile page
├── services/
│   └── api.js            # Centralized API service layer
├── App.js                # Routes + protected route guards
└── index.css             # Global styles
```

## Pages & Routes

### Admin Portal
| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login.js | Login page |
| `/register` | Register.js | Create account |
| `/` | Dashboard.js | Stats & charts |
| `/events` | Events.js | Event management |
| `/attendees` | Attendees.js | Attendee management |
| `/budget` | Budget.js | Budget tracker |
| `/vendors` | Vendors.js | Vendor management |
| `/users` | Users.js | User management |

### Customer Portal
| Route | Component | Description |
|-------|-----------|-------------|
| `/user` | UserHome.js | Browse events |
| `/user/bookings` | MyBookings.js | My bookings |
| `/user/profile` | UserProfile.js | Profile page |

## Run Locally
```bash
npm install
npm start
```