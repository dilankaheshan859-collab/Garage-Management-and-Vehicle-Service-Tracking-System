# Database Setup and Backend Configuration Guide

## Prerequisites
- MySQL 8.0 or higher
- Java 17 (for the backend)
- Maven

## Step 1: Install MySQL

### Windows
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Run the installer and follow the setup wizard
3. Remember the root password you set
4. Start MySQL Service (MySQL80 or equivalent)

### Verify Installation
```bash
mysql --version
```

## Step 2: Create Database

Open MySQL Command Line Client or use MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS gvsts_db;
USE gvsts_db;
```

## Step 3: Run Schema and Seed Data

Execute the schema.sql file located at `backend/src/main/resources/schema.sql`:

Option A - Using MySQL Command Line:
```bash
mysql -u root -p gvsts_db < backend/src/main/resources/schema.sql
```

Option B - Using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to your MySQL Server
3. File > Open SQL Script
4. Select `backend/src/main/resources/schema.sql`
5. Execute the script

## Step 4: Verify Database Setup

Connect to MySQL and verify:
```sql
USE gvsts_db;
SHOW TABLES;
SELECT * FROM service_types;
```

You should see 8 service types inserted:
- Oil Change
- Tire Rotation
- Brake Inspection
- Battery Replacement
- Engine Diagnostic
- Air Filter Replacement
- Transmission Service
- Wheel Alignment

## Step 5: Build Backend

Navigate to the backend directory and run:

```bash
cd backend
mvn clean install
```

or if you have Maven installed globally:
```bash
mvn clean install
```

## Step 6: Start Backend Server

From the backend directory, run:

```bash
mvn spring-boot:run
```

or 

```bash
java -jar target/gvsts-1.0.0.jar
```

The backend will start on `http://localhost:8080/api`

## Database Configuration

The database connection is configured in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gvsts_db
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

**Important:** If you set a MySQL root password, update the `spring.datasource.password` property accordingly.

## API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment
- `GET /api/appointments/date/{date}` - Get appointments by date

### Service Types
- `GET /api/service-types` - Get all service types
- `GET /api/service-types/active` - Get active service types
- `GET /api/service-types/{id}` - Get service type by ID
- `POST /api/service-types` - Create new service type
- `PUT /api/service-types/{id}` - Update service type
- `DELETE /api/service-types/{id}` - Delete service type

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

## Frontend Integration

The frontend is configured to communicate with the backend at `http://localhost:8080/api` with CORS enabled for `http://localhost:3000`.

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL Service is running
- Check if the port 3306 is not blocked
- Verify username and password in application.properties

### Database Not Found Error
- Create the database manually using the commands above
- Ensure the database name matches in application.properties

### Port 8080 Already in Use
- Change the port in application.properties: `server.port=8081`
- Update the frontend API URL accordingly

## Environment Configuration

For production, update these settings in `application.properties`:
- `spring.datasource.url` - Database URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - Change to a secure secret key
- `cors.allowed-origins` - Update to production frontend URL
