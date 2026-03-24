# Appointment System - Fix Summary and Instructions

## Problem Identified
The appointment creation was failing with **"Could not save appointment"** error. The root cause was a **data structure mismatch** between frontend and backend:

### Issues Fixed:
1. ❌ **Frontend was sending customer name** → ✅ **Backend now accepts customer name and looks up ID**
2. ❌ **Frontend was sending service name** → ✅ **Backend now accepts service name and looks up ID**  
3. ❌ **Time format issues** → ✅ **Standardized to 24-hour format throughout**
4. ❌ **Poor error messages** → ✅ **Added detailed error handling with meaningful messages**
5. ❌ **No validation of relationships** → ✅ **Added checks for customer/vehicle/service existence**

## Changes Made

### Backend Changes:

#### 1. **Repository Updates** (`CustomerRepository.java`, `ServiceTypeRepository.java`)
- Added `findByCustomerName(String customerName)` method
- Added `findByServiceName(String serviceName)` method

#### 2. **Service Layer** (`AppointmentService.java`)
Updated `createAppointment()` method to:
- Accept appointment creation with customer name OR customer ID
- Accept service name OR service type ID
- Provide detailed error messages when data is missing

#### 3. **Controller** (`AppointmentController.java`)
- Added error handling for all API endpoints
- Returns meaningful error messages to frontend with HTTP status codes
- Handles both validation and system errors gracefully

#### 4. **New Exception Handler**
- Created `GlobalExceptionHandler.java` for consistent error responses

### Frontend Changes:

#### 1. **Time Format Standardization** (`BookAppointmentForm.jsx`)
- Removed complex time conversion logic
- Keeps time in **24-hour format (HH:MM)** throughout
- HTML input type="time" naturally provides this format

#### 2. **API Data Structure** (`AppointmentCalendar.jsx`)
- Updated `handleAddAppointment()` to send:
  - `vehicleId` as integer
  - `customerName` as string
  - `appointmentDate` in YYYY-MM-DD format
  - `appointmentTime` in HH:MM format
  - `serviceName` as string
  - `status` as string

- Improved error handling with descriptive messages
- Auto-navigation to appointment date in calendar

#### 3. **Edit Functionality**
- Simplified time handling in edit operations
- Maintains consistency with create operations

## How to Use

### Prerequisites
Before creating appointments, ensure your database has:
1. **At least one Customer**
2. **At least one Vehicle** (associated with a customer)
3. **At least one Service Type** (optional but recommended)

### Step 1: Populate Database

Use the provided **DATABASE_UPDATES.sql** file to:

```sql
-- Open MySQL client and execute:
SOURCE DATABASE_UPDATES.sql;

-- Or copy/paste relevant commands from the file
```

### Step 2: Add Sample Data

Run these SQL commands to add test data:

```sql
-- Add a customer
INSERT INTO customers (customer_name, email, phone, address, city, postal_code)
VALUES ('shra', 'shra@example.com', '555-1234', '123 Main St', 'Springfield', '12345');

-- Add a vehicle for that customer (replace 1 with actual customer_id)
INSERT INTO vehicles (vehicle_registration, customer_id, make, model, year, color, license_plate, vin)
VALUES ('CAD-8768', 1, 'Toyota', 'Camry', 2020, 'Silver', 'ABC-1234', 'VIN123456789ABC12');

-- Add service types
INSERT INTO service_types (service_name, description, estimated_duration, cost)
VALUES 
    ('Full Service', 'Complete vehicle maintenance', 120, 199.99),
    ('Oil Change', 'Regular oil and filter change', 30, 49.99);
```

### Step 3: Test the Appointment System

1. Start your backend: `mvn spring-boot:run` (in `/backend` directory)
2. Start your frontend: `npm start` (in `/frontend` directory)
3. Fill out the appointment form:
   - **Customer Name**: "shra" (must exist in database)
   - **Vehicle ID**: "CAD-8768" (must exist in database)
   - **Service Type**: "Full Service" (must exist in database)
   - **Date**: Any future date
   - **Time**: Any time
4. Click "Book Appointment"

### Step 4: Verify Success

The appointment should:
- ✅ Show "Appointment booked successfully!" message
- ✅ Appear on the calendar in the correct date cell
- ✅ Be saved to the database
- ✅ Display all correct information

## Common Issues and Solutions

### Issue: "Could not save appointment: Customer not found with provided ID or name"
**Solution**: 
- The customer name doesn't exist in database
- Add customer first using SQL: 
  ```sql
  INSERT INTO customers (customer_name, email, phone)
  VALUES ('your customer name', 'email@example.com', '555-1234');
  ```

### Issue: "Vehicle not found with ID"
**Solution**:
- The vehicle ID doesn't exist or doesn't match any vehicle_registration
- Add vehicle or check the vehicle_registration value in database

### Issue: Calendar doesn't update after booking
**Solution**:
- Calendar refreshes every 10 seconds (polling)
- If still not showing, check browser console for errors
- Refresh the page manually: F5

### Issue: Time showing incorrectly on calendar
**Solution**:
- All times are now standardized to 24-hour format
- Display converts to 12-hour (AM/PM) for readability
- No conversion issues should occur

## Database Schema Notes

### Customers Table
```
customer_id (INT, PK)
customer_name (VARCHAR 100) - Use this to find customer
email (VARCHAR 100, UNIQUE)
phone (VARCHAR 20)
```

### Vehicles Table
```
vehicle_id (INT, PK)
vehicle_registration (VARCHAR 50) - The ID shown in form
customer_id (INT, FK) - Must exist in customers table
make, model, year, color, license_plate, vin
```

### Service Types Table
```
service_type_id (INT, PK)
service_name (VARCHAR 100) - Use this to find service
description, estimated_duration, cost
is_active (BOOLEAN)
```

### Appointments Table
```
appointment_id (INT, PK, auto-generated)
vehicle_id (INT, FK) - Must exist in vehicles
customer_id (INT, FK) - Must exist in customers
appointment_date (DATE)
appointment_time (TIME) - 24-hour format
service_type_id (INT, FK) - Can be NULL
status - Pending, Confirmed, Completed, Cancelled
assigned_mechanic, notes
```

## API Endpoints Reference

### Create Appointment (POST)
```
URL: POST http://localhost:8080/api/appointments
Content-Type: application/json

Body:
{
  "vehicleId": 1,
  "customerName": "shra",  // Can use name instead of ID
  "appointmentDate": "2025-04-15",
  "appointmentTime": "10:00",  // 24-hour format
  "serviceName": "Full Service",  // Can use name instead of ID
  "status": "Pending"
}

Response on Success (201 Created):
{
  "appointmentId": 1,
  "vehicleId": 1,
  "customerId": 1,
  "customerName": "shra",
  "vehicleRegistration": "CAD-8768",
  "appointmentDate": "2025-04-15",
  "appointmentTime": "10:00:00",
  "status": "Pending",
  "serviceName": "Full Service"
}

Response on Error (400 Bad Request):
{
  "message": "Customer not found with provided ID or name"
}
```

### Get All Appointments
```
URL: GET http://localhost:8080/api/appointments
```

### Get Appointments by Date
```
URL: GET http://localhost:8080/api/appointments/date/2025-04-15
```

### Update Appointment
```
URL: PUT http://localhost:8080/api/appointments/1
```

### Delete Appointment
```
URL: DELETE http://localhost:8080/api/appointments/1
```

## Files Modified

1. ✅ `backend/src/main/java/com/garage/gvsts/repository/CustomerRepository.java`
2. ✅ `backend/src/main/java/com/garage/gvsts/repository/ServiceTypeRepository.java`
3. ✅ `backend/src/main/java/com/garage/gvsts/service/AppointmentService.java`
4. ✅ `backend/src/main/java/com/garage/gvsts/controller/AppointmentController.java`
5. ✅ `backend/src/main/java/com/garage/gvsts/exception/GlobalExceptionHandler.java` (NEW)
6. ✅ `frontend/src/components/BookAppointmentForm.jsx`
7. ✅ `frontend/src/components/AppointmentCalendar.jsx`
8. ✅ `DATABASE_UPDATES.sql` (NEW) - Ready-to-use SQL scripts

## Testing Checklist

- [ ] Database has at least 1 customer
- [ ] Database has at least 1 vehicle (linked to customer)
- [ ] Database has at least 1 service type
- [ ] Backend is running on http://localhost:8080
- [ ] Frontend is running on http://localhost:3000
- [ ] Can fill appointment form without errors
- [ ] "Appointment booked successfully!" message appears
- [ ] Appointment appears on calendar on correct date
- [ ] Appointment data is correct (customer, vehicle, time, service)
- [ ] Can edit appointment with changes saved
- [ ] Can delete appointment from calendar
- [ ] Calendar updates automatically every 10 seconds

## Next Steps

1. **Run Database Updates**: Execute DATABASE_UPDATES.sql to populate test data
2. **Restart Services**: Stop and restart both backend and frontend
3. **Test Booking**: Try creating an appointment with the form
4. **Monitor Console**: Check browser console (F12) and backend logs for any errors
5. **Report Feedback**: If any issues, check error messages carefully

## Support

For detailed error messages:
- Check **Browser Console** (F12 → Console tab)
- Check **Backend Logs** where Spring Boot is running
- Enable verbose logging in `application.properties`:
  ```
  logging.level.com.garage.gvsts=DEBUG
  ```
