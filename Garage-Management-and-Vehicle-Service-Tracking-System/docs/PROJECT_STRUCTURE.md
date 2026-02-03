# Project Structure Documentation

## Directory Tree

```
project vehicale/
├── frontend/                          # React.js Frontend Application
│   ├── public/                        # Static files
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/               # Reusable React Components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ...
│   │   ├── pages/                    # Page Components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── VehicleManagement.jsx
│   │   │   ├── ServiceTracking.jsx
│   │   │   ├── CustomerManagement.jsx
│   │   │   ├── ServiceReminders.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ...
│   │   ├── services/                 # API Integration
│   │   │   ├── vehicleService.js
│   │   │   ├── serviceService.js
│   │   │   ├── customerService.js
│   │   │   ├── authService.js
│   │   │   └── api.js               # Axios Configuration
│   │   ├── hooks/                    # Custom React Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── ...
│   │   ├── styles/                   # CSS/Styling
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   └── variables.css
│   │   ├── utils/                    # Utility Functions
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── backend/                           # Spring Boot Java Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/garage/gvsts/
│   │   │   │       ├── controller/           # REST API Controllers
│   │   │   │       │   ├── VehicleController.java
│   │   │   │       │   ├── ServiceController.java
│   │   │   │       │   ├── CustomerController.java
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   └── ...
│   │   │   │       ├── service/              # Business Logic
│   │   │   │       │   ├── VehicleService.java
│   │   │   │       │   ├── ServiceService.java
│   │   │   │       │   ├── CustomerService.java
│   │   │   │       │   ├── AuthService.java
│   │   │   │       │   └── ...
│   │   │   │       ├── repository/           # Data Access Layer (JPA)
│   │   │   │       │   ├── VehicleRepository.java
│   │   │   │       │   ├── ServiceRepository.java
│   │   │   │       │   ├── CustomerRepository.java
│   │   │   │       │   ├── UserRepository.java
│   │   │   │       │   └── ...
│   │   │   │       ├── model/                # JPA Entities
│   │   │   │       │   ├── Vehicle.java
│   │   │   │       │   ├── Service.java
│   │   │   │       │   ├── Customer.java
│   │   │   │       │   ├── User.java
│   │   │   │       │   ├── ServiceHistory.java
│   │   │   │       │   └── ...
│   │   │   │       ├── dto/                  # Data Transfer Objects
│   │   │   │       │   ├── VehicleDTO.java
│   │   │   │       │   ├── ServiceDTO.java
│   │   │   │       │   ├── CustomerDTO.java
│   │   │   │       │   ├── UserDTO.java
│   │   │   │       │   └── ...
│   │   │   │       ├── config/               # Configuration Classes
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   ├── CorsConfig.java
│   │   │   │       │   ├── JwtConfig.java
│   │   │   │       │   └── ...
│   │   │   │       ├── exception/            # Custom Exceptions
│   │   │   │       │   ├── ResourceNotFoundException.java
│   │   │   │       │   ├── DuplicateResourceException.java
│   │   │   │       │   ├── GlobalExceptionHandler.java
│   │   │   │       │   └── ...
│   │   │   │       ├── security/             # Security Components
│   │   │   │       │   ├── JwtTokenProvider.java
│   │   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │   │       │   └── ...
│   │   │   │       └── GvstApplication.java  # Main Application Class
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       ├── application-prod.properties
│   │   │       └── data.sql
│   │   │
│   │   └── test/
│   │       └── java/com/garage/gvsts/
│   │           └── [Test Classes]
│   │
│   ├── pom.xml                       # Maven Configuration
│   └── .gitignore
│
├── docs/                              # Documentation
│   ├── PROJECT_STRUCTURE.md           # This file
│   ├── API_DOCUMENTATION.md           # API Endpoints
│   ├── DATABASE_SCHEMA.md             # Database Design
│   ├── SETUP_INSTRUCTIONS.md          # Setup Guide
│   └── ARCHITECTURE.md                # System Architecture
│
├── README.md                          # Project Overview
└── .gitignore                         # Git Ignore Rules

```

## Key Components Overview

### Frontend Structure
- **components/**: Reusable UI components (buttons, modals, forms, etc.)
- **pages/**: Full-page components for different routes
- **services/**: API client functions for backend communication
- **hooks/**: Custom React hooks for state management and effects
- **styles/**: Centralized CSS and styling
- **utils/**: Helper functions and constants

### Backend Structure
- **controller/**: HTTP request handlers and route definitions
- **service/**: Business logic implementation
- **repository/**: Database operations using Spring Data JPA
- **model/**: Database entity classes
- **dto/**: Objects for API request/response
- **config/**: Spring configurations (Security, CORS, JWT, etc.)
- **exception/**: Custom exception handling
- **security/**: Authentication and authorization components

## Technology Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Axios, React Router |
| Backend | Spring Boot, Spring Data JPA, Spring Security |
| Database | MySQL |
| Build Tools | npm (Frontend), Maven (Backend) |
| Authentication | JWT (JSON Web Tokens) |

---
Last Updated: February 3, 2026
