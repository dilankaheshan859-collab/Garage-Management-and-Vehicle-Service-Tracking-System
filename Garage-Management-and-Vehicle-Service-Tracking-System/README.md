# Garage Management and Vehicle Service Tracking System

## Project Overview
This system addresses the issues faced by garage owners and vehicle customers by providing:
- Efficient vehicle service tracking
- Real-time customer updates
- Service reminders
- Vehicle inventory management
- Business operation efficiency

## Project Information
- **Project ID**: [Your Project ID]
- **Institution**: Sri Lanka Institute of Information Technology (SLIIT)
- **Campus**: Malabe
- **Stream**: Information Technology
- **Group Members**:
  1. Prabuddhi K.A.G. (IT24101146)
  2. Dulash A.K. (IT24102769)
  3. Maharamba M.H.M.L. (IT24100428)
  4. Dilanka P.H. (IT24103939)
  5. Bandara D.M.R.M. (IT24102090)
  6. Sarvithan P. (IT24104232)

## Tech Stack
- **Frontend**: React.js
- **Backend**: Spring Boot (Java)
- **Database**: MySQL/PostgreSQL
- **Build Tool**: Maven (Backend), npm (Frontend)

## Project Structure

### Frontend (`/frontend`)
- `public/` - Static assets
- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `services/` - API integration
  - `hooks/` - Custom React hooks
  - `styles/` - CSS/styling files
  - `utils/` - Utility functions

### Backend (`/backend`)
- `src/main/java/com/garage/gvsts/` - Application source
  - `controller/` - REST API endpoints
  - `service/` - Business logic
  - `repository/` - Data access layer
  - `model/` - Entity models
  - `dto/` - Data Transfer Objects
  - `config/` - Configuration classes
  - `exception/` - Custom exceptions
- `src/main/resources/` - Configuration files
- `src/test/` - Unit tests

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Features to Implement
- [ ] Vehicle Registration & Tracking
- [ ] Service History Management
- [ ] Customer Management
- [ ] Service Reminders
- [ ] Progress Tracking
- [ ] Authentication & Authorization
- [ ] Reporting & Analytics

## API Documentation
- Coming soon

## Database Schema
- Coming soon

## Testing
- Frontend: Jest + React Testing Library
- Backend: JUnit + Mockito

## Deployment
- Coming soon

---
Last Updated: February 3, 2026
