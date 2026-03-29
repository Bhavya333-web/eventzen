# 🧪 Testing Documentation – EventZen

> API Testing, Frontend Testing, and Validation Evidence

---

## Testing Approach

EventZen was tested using:
1. **Postman** – API endpoint testing
2. **Manual UI Testing** – Frontend flow validation
3. **Browser Console** – Error monitoring

---

## 📮 Postman API Testing

---

### Test Case 1: User Registration

**Request:**
```
POST http://localhost:5001/api/auth/register
Body: {
  "name": "Test Admin",
  "email": "admin@test.com",
  "password": "Admin123",
  "role": "admin",
  "adminCode": "EVENTZEN@ADMIN2025"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid registration | 201 Created | ✅ Pass |
| Duplicate email | 400 "Email already exists" | ✅ Pass |
| Wrong admin code | 403 "Invalid admin code!" | ✅ Pass |
| Missing fields | 400 Error | ✅ Pass |

![Screenshot](Docs/images/User Registration.png)

---

### Test Case 2: User Login

**Request:**
```
POST http://localhost:5001/api/auth/login
Body: {
  "email": "admin@test.com",
  "password": "Admin123"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid credentials | 200 + JWT token | ✅ Pass |
| Wrong password | 400 "Wrong password" | ✅ Pass |
| Non-existent email | 400 "User not found" | ✅ Pass |

**Screenshot location:** Take screenshot showing JWT token in response body

---

### Test Case 3: Get All Users (Protected)

**Request:**
```
GET http://localhost:5001/api/auth/users
Headers: Authorization: Bearer <token>
```

| Test | Expected | Result |
|------|----------|--------|
| With valid JWT | 200 + user array | ✅ Pass |
| Without JWT | 401 "No token provided" | ✅ Pass |
| Expired/invalid JWT | 401 "Invalid token" | ✅ Pass |

---

### Test Case 4: Create Event

**Request:**
```
POST http://localhost:5002/api/events
Headers: Authorization: Bearer <token>
Body: {
  "title": "Tech Conference 2025",
  "description": "Annual tech event",
  "date": "2025-06-15",
  "venue": "Mumbai Convention Center",
  "capacity": 500,
  "status": "upcoming"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid event data | 201 Created with _id | ✅ Pass |
| Missing required field | 500 Error | ✅ Pass |

---

### Test Case 5: Get All Events

**Request:**
```
GET http://localhost:5002/api/events
```

| Test | Expected | Result |
|------|----------|--------|
| Events exist | 200 + array of events | ✅ Pass |
| Empty database | 200 + empty array [] | ✅ Pass |

---

### Test Case 6: Update Event

**Request:**
```
PUT http://localhost:5002/api/events/<event_id>
Headers: Authorization: Bearer <token>
Body: {
  "status": "ongoing"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid update | 200 + updated event | ✅ Pass |
| Invalid ID format | 500 Error | ✅ Pass |

---

### Test Case 7: Register Attendee

**Request:**
```
POST http://localhost:5172/api/attendee
Body: {
  "name": "Bhavya Mittal",
  "email": "bhavya@gmail.com",
  "eventId": "<event_id_from_step_4>"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid registration | 200 + attendee object | ✅ Pass |
| Missing eventId | 400 Error | ✅ Pass |

---

### Test Case 8: Create Budget

**Request:**
```
POST http://localhost:5003/api/budget
Body: {
  "eventId": "<event_id>",
  "totalBudget": 50000,
  "expenses": []
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid budget | 200 + budget object | ✅ Pass |

---

### Test Case 9: Add Expense

**Request:**
```
POST http://localhost:5003/api/budget/<event_id>/expense
Body: {
  "name": "Venue Booking",
  "amount": 15000,
  "category": "venue"
}
```

| Test | Expected | Result |
|------|----------|--------|
| Valid expense | 200 + updated budget | ✅ Pass |
| Non-existent event | 500 Error | ✅ Pass |

---

## 🖥️ Frontend UI Testing

### Registration Validation Tests

| Test Case | Action | Expected | Result |
|-----------|--------|----------|--------|
| Short password | Enter "123" | "Password must be at least 6 characters!" | ✅ |
| No number in password | Enter "abcdef" | "Password must contain at least 1 number!" | ✅ |
| Wrong admin code | Enter "wrong123" | "Invalid admin code!" from server | ✅ |
| Duplicate email | Register twice | "Email already exists" | ✅ |
| Empty name field | Submit blank | Browser validation prevents submit | ✅ |

### Login Flow Tests

| Test Case | Action | Expected | Result |
|-----------|--------|----------|--------|
| Admin login | Login as admin | Redirect to `/` dashboard | ✅ |
| User login | Login as user | Redirect to `/user` portal | ✅ |
| Wrong password | Enter wrong pass | "Invalid email or password!" error | ✅ |
| No token, visit `/` | Clear storage | Redirect to `/login` | ✅ |

### Event CRUD Tests

| Test Case | Action | Expected | Result |
|-----------|--------|----------|--------|
| Create event | Fill form, submit | New card in grid | ✅ |
| Edit event | Click edit, modify, save | Card updated | ✅ |
| Delete event | Click delete, confirm | Card removed | ✅ |
| Search events | Type in search bar | Real-time filter | ✅ |
| Filter by status | Click filter tab | Shows correct events | ✅ |

### Booking Tests

| Test Case | Action | Expected | Result |
|-----------|--------|----------|--------|
| Book event | Click "Book Now" | Success message shown | ✅ |
| Book same event again | Click "Book Now" again | "Already registered!" alert | ✅ |
| Book completed event | Button disabled | "Event Ended" shown | ✅ |
| View bookings | Go to /user/bookings | All booked events listed | ✅ |

---

## 📸 Screenshots to Take for Submission

### Postman Screenshots (take these while app is running):
1. `POST /api/auth/register` → 201 response
2. `POST /api/auth/login` → 200 response with token
3. `GET /api/auth/users` → 200 with user list
4. `POST /api/events` → 201 with event object
5. `GET /api/events` → 200 with events array
6. `POST /api/attendee` → 200 with attendee object
7. `POST /api/budget` → 200 with budget object
8. `POST /api/budget/{id}/expense` → 200 updated budget

### App UI Screenshots (take these from browser):
1. Login page
2. Register page with Admin role selected
3. Admin Dashboard
4. Events page with event cards
5. Create Event modal
6. Attendees page
7. Budget page with progress bar
8. Vendors page
9. Users page
10. Customer Portal home
11. My Bookings page
12. Docker Desktop or `docker ps` terminal output

---

## 🐳 Docker Verification

Run this command and screenshot the output:
```bash
docker ps
```

Expected output shows 7 containers:
```
CONTAINER ID   IMAGE                   STATUS   PORTS
...            eventzen-frontend       Up       0.0.0.0:3000->3000/tcp
...            eventzen-auth           Up       0.0.0.0:5001->5001/tcp
...            eventzen-events         Up       0.0.0.0:5002->5002/tcp
...            eventzen-attendees      Up       0.0.0.0:5172->5172/tcp
...            eventzen-budget         Up       0.0.0.0:5003->5003/tcp
...            mysql:8.0               Up       0.0.0.0:3307->3306/tcp
...            mongo:6.0               Up       0.0.0.0:27017->27017/tcp
```

---

*EventZen Testing Documentation | Bhavya Mittal | Deloitte Training 2025-26*