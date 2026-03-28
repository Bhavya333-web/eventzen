# Budget Service

> **EventZen Microservice** | Spring Boot 3.x + Java 21 + MongoDB

## Overview
This microservice handles all **Budget Tracking and Expense Management** operations. Built with **Spring Boot** to demonstrate Java microservices in the EventZen ecosystem.

## Tech Stack
- **Framework:** Spring Boot 3.4.x
- **Language:** Java 21
- **Database:** MongoDB via Spring Data MongoDB
- **Build Tool:** Maven
- **Port:** 5003

## Folder Structure
```
budget-service/
└── src/main/java/com/eventzen/budgetservice/
    ├── Budget.java              # Data model with embedded Expense
    ├── BudgetController.java    # REST API controller
    ├── BudgetRepository.java    # Spring Data MongoDB repository
    └── BudgetServiceApplication.java  # Main Spring Boot app
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/budget` | Create budget for event |
| GET | `/api/budget/{eventId}` | Get budget by event ID |
| POST | `/api/budget/{eventId}/expense` | Add expense to budget |
| DELETE | `/api/budget/{id}` | Delete budget |

## Configuration (application.properties)
```properties
spring.application.name=budget-service
server.port=5003
spring.data.mongodb.uri=mongodb://localhost:27017/eventzen_budget
```

## Run Locally
```bash
./mvnw spring-boot:run
# Windows:
.\mvnw spring-boot:run
```