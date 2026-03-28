# Attendee Service

> **EventZen Microservice** | .NET 8 + ASP.NET Core + MongoDB

## Overview
This microservice handles all **Attendee Registration and Management** operations. Built with **.NET 8** as a separate microservice to demonstrate polyglot microservices architecture.

## Tech Stack
- **Framework:** ASP.NET Core Web API (.NET 8)
- **Database:** MongoDB 6.0
- **Language:** C#
- **Port:** 5172

## Folder Structure
```
attendee-service/
└── AttendeeService/
    ├── Controllers/
    │   └── AttendeeController.cs   # API endpoints
    ├── Attendee.cs                  # Data model
    ├── AttendeeService.cs           # Business logic & DB operations
    ├── BudgetRepository.java        # Data access layer
    ├── Program.cs                   # App configuration & startup
    ├── appsettings.json             # MongoDB connection settings
    └── Dockerfile                   # Container config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendee` | Get all attendees |
| GET | `/api/attendee/event/{eventId}` | Get attendees by event |
| POST | `/api/attendee` | Register attendee |
| DELETE | `/api/attendee/{id}` | Remove attendee |

## Configuration (appsettings.json)
```json
{
  "MongoDBSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "eventzen_attendees",
    "CollectionName": "attendees"
  }
}
```

## Run Locally
```bash
dotnet restore
dotnet run
```