# 🔄 User Flow – EventZen

> Complete user journey documentation for all roles in the EventZen system

---

## User Roles

| Role | Portal | Access |
|------|--------|--------|
| **Admin** | Admin Portal (`/`) | Full CRUD on all modules |
| **Regular User** | Customer Portal (`/user`) | Browse and book events only |

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────┐
│         User visits the app          │
│      http://localhost:3000           │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│         No token in storage?         │
│    → Redirect to /login page         │
└──────────────────┬───────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
   Have Account?     New User?
          │                 │
          ▼                 ▼
   Login at /login   Register at /register
          │                 │
          └────────┬────────┘
                   │
                   ▼
      JWT Token generated & stored
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    role = admin      role = user
          │                 │
          ▼                 ▼
  Admin Dashboard    Customer Portal
      at /               at /user
```

---

## 👑 Admin User Flow

### Step 1: First Time Setup
```
1. Go to http://localhost:3000/register
2. Fill in: Name, Email, Password (min 6 chars, 1 number)
3. Select Account Type: "Admin"
4. Enter Admin Secret Code: EVENTZEN@ADMIN2025
5. Click "Create Account"
6. Redirected to /login after 2 seconds
```

### Step 2: Login
```
1. Go to /login
2. Enter email and password
3. System validates credentials
4. JWT token generated (24hr expiry)
5. Stored in browser localStorage
6. Redirected to Admin Dashboard at /
```

### Step 3: Dashboard
```
Dashboard shows:
  ├── Total Events count
  ├── Upcoming Events count
  ├── Total Capacity
  ├── Completed Events count
  ├── Bar Chart: Event capacity comparison
  ├── Pie Chart: Event status distribution
  └── Recent Events table (last 5)
```

### Step 4: Manage Events (`/events`)
```
CREATE EVENT:
  1. Click "+ Create Event" button
  2. Fill modal: Title, Description, Date, Venue, Capacity, Status
  3. Click "Create Event"
  4. New event card appears in grid

EDIT EVENT:
  1. Click "✏️ Edit" on event card
  2. Modal opens with existing data
  3. Update fields
  4. Click "Update Event"

DELETE EVENT:
  1. Click "🗑️ Delete" on event card
  2. Confirm dialog appears
  3. Click OK to confirm
  4. Card removed from grid

SEARCH/FILTER:
  1. Type in search bar → real-time filter
  2. Click status tabs (All/Upcoming/Ongoing/Completed)
```

### Step 5: Manage Attendees (`/attendees`)
```
VIEW ATTENDEES:
  1. Select event from dropdown
  2. Event info banner shows (title, venue, date, count, capacity, fill%)
  3. Attendee cards load in grid

REGISTER ATTENDEE:
  1. Click "+ Register Attendee"
  2. Enter Name and Email in modal
  3. Click "Register"
  4. New attendee card appears

REMOVE ATTENDEE:
  1. Click "Remove" on attendee card
  2. Confirm dialog
  3. Attendee removed
```

### Step 6: Track Budget (`/budget`)
```
SET BUDGET:
  1. Select event from dropdown
  2. If no budget exists → "Set Budget" button appears
  3. Enter total budget amount
  4. Click "Set Budget"
  5. Summary cards appear

ADD EXPENSE:
  1. Click "+ Add Expense" button
  2. Enter: Expense Name, Amount, Category
  3. Click "Add Expense"
  4. Expense appears in list
  5. Remaining balance auto-updates
  6. Progress bar updates
```

### Step 7: Manage Vendors (`/vendors`)
```
ADD VENDOR:
  1. Click "+ Add Vendor"
  2. Fill: Name, Phone, Email, Price, Category, Status, EventId, Notes
  3. Click "Add Vendor"
  4. Vendor card appears in grid

EDIT/DELETE: Same as Events flow
```

### Step 8: View Users (`/users`)
```
  1. Navigate to /users
  2. All registered users shown as cards
  3. Each card shows: Avatar (initials), Name, Email, Role badge
  4. Stats: Total, Admins, Regular Users
  5. Search by name or email
```

### Step 9: Logout
```
  1. Click "Logout" button at bottom of sidebar
  2. JWT token removed from localStorage
  3. User object cleared
  4. Redirected to /login
```

---

## 👤 Customer User Flow

### Step 1: Register
```
1. Go to http://localhost:3000/register
2. Fill: Name, Email, Password
3. Select: "Regular User" (no secret code needed)
4. Click "Create Account"
5. Redirected to /login
```

### Step 2: Login
```
1. Enter credentials at /login
2. Role = "user" → Redirected to /user (Customer Portal)
```

### Step 3: Browse Events (`/user`)
```
Customer Home:
  ├── Welcome banner with user's name
  ├── Search bar for events
  ├── Filter tabs: All / Upcoming / Ongoing
  └── Event cards grid showing all events

Each event card shows:
  ├── Colorful banner with emoji
  ├── Status badge (upcoming/ongoing/completed)
  ├── Event title and description
  ├── Venue location
  ├── Date
  ├── Available seats
  └── "Book Now" button (disabled if completed)
```

### Step 4: Book Event
```
1. Find event of interest
2. Click "🎟️ Book Now"
3. System checks if already registered
   ├── Already registered → Alert: "Already registered for this event!"
   └── New booking → Registration saved
4. Success message: "Successfully booked for [Event Name]!"
5. Message auto-disappears after 3 seconds
```

### Step 5: View My Bookings (`/user/bookings`)
```
1. Navigate to "My Bookings" in navbar
2. System fetches all events user is registered for
3. Each booking card shows:
   ├── Event emoji icon
   ├── Event title
   ├── Venue and date
   ├── "Confirmed ✅" green badge
   └── Booking date
4. If no bookings → empty state with message
```

### Step 6: View Profile (`/user/profile`)
```
1. Navigate to "Profile" in navbar
2. Profile page shows:
   ├── Large gradient avatar (initials)
   ├── Full name
   ├── Email address
   ├── Account type badge (user)
   └── Account details table:
       ├── Full Name
       ├── Email Address
       ├── Account Type
       └── User ID
```

---

## 🔄 Complete Flow Diagram

```
                    ┌─────────────────┐
                    │  Open App       │
                    │ localhost:3000  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   /login page   │
                    └────────┬────────┘
                    ┌────────┴────────┐
                    │                 │
             ┌──────▼──────┐   ┌──────▼──────┐
             │ Admin Login │   │  User Login │
             └──────┬──────┘   └──────┬──────┘
                    │                 │
             ┌──────▼──────┐   ┌──────▼──────┐
             │  Dashboard  │   │ Customer    │
             │     /       │   │ Portal /user│
             └──────┬──────┘   └──────┬──────┘
                    │                 │
        ┌───────────┼───────┐    ┌────┼────┐
        │           │       │    │    │    │
        ▼           ▼       ▼    ▼    ▼    ▼
    /events  /attendees  /budget /user /user/bookings
    /vendors    /users           /user/profile
```

---

*EventZen User Flow | Bhavya Mittal | Deloitte Training 2025-26*