# 🎨 Wireframes – EventZen

> UI Layout Design Documentation



## Wireframe Tool Used
**Canva** / **draw.io** — for wireframe design

---

## Pages Wireframed

### 1. Login Page (`/login`)
```
┌─────────────────────────────────────────────────────────┐
│  LEFT PANEL (60%)              RIGHT PANEL (40%)        │
│  ┌─────────────────────┐      ┌─────────────────────┐  │
│  │  Brand Logo          │      │  ⚡ EventZen Logo    │  │
│  │  Tagline             │      │  "Welcome back 👋"  │  │
│  │                      │      │                     │  │
│  │  [Event Card 1]      │      │  Email:             │  │
│  │  [Event Card 2]      │      │  [______________]   │  │
│  │  [Event Card 3]      │      │                     │  │
│  │  [Event Card 4]      │      │  Password:          │  │
│  │                      │      │  [______________]   │  │
│  │  • Seamless          │      │                     │  │
│  │  • Powerful          │      │  [  Sign In →  ]    │  │
│  │  • Effortless        │      │                     │  │
│  │                      │      │  "Register" link    │  │
│  └─────────────────────┘      └─────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### 2. Register Page (`/register`)
```
┌─────────────────────────────────────────────────────────┐
│  LEFT PANEL (60%)              RIGHT PANEL (40%)        │
│  ┌─────────────────────┐      ┌─────────────────────┐  │
│  │  "Start Managing     │      │  ⚡ EventZen Logo    │  │
│  │   Your Events"       │      │  "Create Account 🚀"│  │
│  │                      │      │                     │  │
│  │  [🎯] Smart Sched.  │      │  Full Name:         │  │
│  │  [👥] Attendees     │      │  [______________]   │  │
│  │  [💰] Budget        │      │  Email:             │  │
│  │  [🏪] Vendors       │      │  [______________]   │  │
│  │                      │      │  Password:          │  │
│  │                      │      │  [______________]   │  │
│  │                      │      │  Account Type:      │  │
│  │                      │      │  [Admin ▼]          │  │
│  │                      │      │  Admin Code:        │  │
│  │                      │      │  [______________]   │  │
│  │                      │      │  [Create Account →] │  │
│  └─────────────────────┘      └─────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### 3. Admin Dashboard (`/`)
```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (200px)    │  TOP BAR                          │
│  ⚡ EventZen        │  ≡  Welcome back, Bhavya 👋  [Pro]│
│  ─────────────      ├──────────────────────────────────│
│  [Dashboard] ◀      │                                   │
│  [Events]           │  STAT CARDS (4 columns)           │
│  [Attendees]        │  ┌──────┐┌──────┐┌──────┐┌──────┐│
│  [Budget]           │  │ 🎯  ││ 🚀  ││ 👥  ││ ✅  ││
│  [Vendors]          │  │  5  ││  3  ││ 1250││  2  ││
│  [Users]            │  │Total││ Up  ││ Cap ││Done ││
│  ─────────────      │  └──────┘└──────┘└──────┘└──────┘│
│  👤 Bhavya          │                                   │
│  [Logout]           │  ┌─────────────────┐┌───────────┐│
│                     │  │  Bar Chart      ││ Pie Chart ││
│                     │  │  (Capacity)     ││ (Status)  ││
│                     │  └─────────────────┘└───────────┘│
│                     │                                   │
│                     │  Recent Events Table              │
│                     │  Title │ Venue │ Date │ Status    │
│                     │  ──────┼───────┼──────┼─────────  │
│                     │  Tech  │Mumbai │Jun15 │[upcoming] │
└─────────────────────┴──────────────────────────────────┘
```

---

### 4. Events Page (`/events`)
```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR  │  Event Management          [+ Create Event] │
│           │  ─────────────────────────────────────────  │
│           │  [Search bar...]  [All][Upcoming][Ongoing]  │
│           │                                             │
│           │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│           │  │[Banner]  │ │[Banner]  │ │[Banner]  │   │
│           │  │Tech Conf │ │Music Ngt │ │Business  │   │
│           │  │📍 Mumbai │ │📍 Delhi  │ │📍 Pune   │   │
│           │  │📅 Jun 15 │ │📅 Jul 20 │ │📅 Aug 5  │   │
│           │  │👥 500    │ │👥 300    │ │👥 200    │   │
│           │  │[Edit][Del]│ │[Edit][Del]│ │[Edit][Del]│  │
│           │  └──────────┘ └──────────┘ └──────────┘   │
│           │                                             │
│           │  CREATE/EDIT MODAL (overlay):               │
│           │  ┌─────────────────────────────────────┐   │
│           │  │ ✨ Create New Event           [X]   │   │
│           │  │ Title: [___________________]        │   │
│           │  │ Desc:  [___________________]        │   │
│           │  │ Date:  [date picker]                │   │
│           │  │ Venue: [___________________]        │   │
│           │  │ Cap:   [___________________]        │   │
│           │  │ Status:[Upcoming ▼]                 │   │
│           │  │        [   Create Event ✨  ]       │   │
│           │  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

### 5. Attendees Page (`/attendees`)
```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR  │  Attendee Management   [+ Register Attendee]│
│           │  ─────────────────────────────────────────  │
│           │  Select Event: [Tech Conference 2025 ▼]     │
│           │                                             │
│           │  ┌─────────────────────────────────────┐   │
│           │  │ 🎪 Tech Conference 2025              │   │
│           │  │ 📍 Mumbai · 📅 Jun 15               │   │
│           │  │ Registered: 3  Capacity: 500  Fill:1%│   │
│           │  └─────────────────────────────────────┘   │
│           │                                             │
│           │  [Search attendees...]                      │
│           │                                             │
│           │  Attendees (3)                              │
│           │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│           │  │  [B]     │ │  [A]     │ │  [S]     │   │
│           │  │ Bhavya   │ │ Akshat   │ │ Shoaib   │   │
│           │  │ b@gmail  │ │ a@gmail  │ │ s@gmail  │   │
│           │  │[registered]│[registered]│[registered]│  │
│           │  │[Remove]  │ │[Remove]  │ │[Remove]  │   │
│           │  └──────────┘ └──────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

### 6. Budget Page (`/budget`)
```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR  │  Budget Tracker            [+ Add Expense]  │
│           │  ─────────────────────────────────────────  │
│           │  Select Event: [Tech Conference 2025 ▼]     │
│           │                                             │
│           │  ┌────────────┐ ┌────────────┐ ┌─────────┐ │
│           │  │ 💎         │ │ 💸         │ │ ✅      │ │
│           │  │ ₹50,000    │ │ ₹32,000    │ │ ₹18,000 │ │
│           │  │ Total      │ │ Expenses   │ │Remaining│ │
│           │  └────────────┘ └────────────┘ └─────────┘ │
│           │                                             │
│           │  Budget Used: 64%                           │
│           │  [████████████████░░░░░░░] 64%              │
│           │                                             │
│           │  💸 Expense Breakdown                       │
│           │  ┌───────────────────────────────────────┐  │
│           │  │ [🏛️] Venue Booking    [venue]  ₹15K  │  │
│           │  │ [🍽️] Food & Drinks   [catering]₹10K  │  │
│           │  │ [🎨] Decoration      [decor]   ₹7K   │  │
│           │  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### 7. Customer Portal Home (`/user`)
```
┌─────────────────────────────────────────────────────────┐
│  ⚡ EventZen    [Home] [Bookings] [Profile]   Bhavya→   │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Welcome back, Bhavya! 👋                        │   │
│  │  Discover and book amazing events                │   │
│  │  [🔍 Search events...                        ]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [🎯 All Events] [🚀 Upcoming] [🔥 Ongoing]  5 found   │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │[Banner]  │ │[Banner]  │ │[Banner]  │               │
│  │🎵        │ │🎉        │ │💼        │               │
│  │upcoming  │ │ongoing   │ │completed │               │
│  │Tech Conf │ │Music Ngt │ │Biz Meet  │               │
│  │📍 Mumbai │ │📍 Delhi  │ │📍 Pune   │               │
│  │📅 Jun 15 │ │📅 Jul 20 │ │📅 Aug 5  │               │
│  │👥 500    │ │👥 300    │ │👥 200    │               │
│  │[Book Now]│ │[Book Now]│ │[Ended ❌]│               │
│  └──────────┘ └──────────┘ └──────────┘               │
└─────────────────────────────────────────────────────────┘
```

---

### 8. My Bookings (`/user/bookings`)
```
┌─────────────────────────────────────────────────────────┐
│  ⚡ EventZen    [Home] [Bookings▶] [Profile]  Bhavya→  │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  My Bookings 🎟️                                         │
│  All events you have registered for                     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [🎟️]  Tech Conference 2025                     │   │
│  │        📍 Mumbai · 📅 Jun 15                    │   │
│  │                          ✅ Confirmed            │   │
│  │                          Booked on Mar 22       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [🎟️]  Music Night 2025                         │   │
│  │        📍 Delhi · 📅 Jul 20                     │   │
│  │                          ✅ Confirmed            │   │
│  │                          Booked on Mar 23       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```


*EventZen Wireframes | Bhavya Mittal | Deloitte Training 2025-26*