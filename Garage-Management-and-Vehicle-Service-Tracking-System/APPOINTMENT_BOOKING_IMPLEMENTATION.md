# Appointment Booking System - Implementation Guide

## Overview
This is a complete multi-step appointment booking system with calendar integration and holiday management. The system includes:

1. **Multi-Step Booking Form** (3 steps)
   - Step 1: Vehicle & Contact Details
   - Step 2: Choose Date & Time with Calendar
   - Step 3: Confirm Appointment

2. **Holiday Management** - Easy-to-use admin interface for managing holidays

3. **Calendar Integration** - Shows appointments and holidays on the calendar

4. **Backend Integration** - Fully integrated with Spring Boot backend

## Features Implemented

### Frontend Components

#### 1. **BookAppointmentForm.jsx** (Enhanced Multi-Step)
- **Step 1: Vehicle & Contact Details**
  - Vehicle information: No, Make, Model, Type
  - Contact Information: Phone (WhatsApp), Name, Email
  - Additional Notes field
  - Service Type selection
  
- **Step 2: Choose Date & Time**
  - Calendar view showing all dates
  - Holiday indicators (🏖️)
  - Weekend indicators (⌛)
  - Disabled past dates
  - Time slot selection (9 AM - 6 PM in 30-min intervals)
  - Past dates are disabled automatically
  - Holidays are disabled for booking

- **Step 3: Confirmation**
  - Review all appointment details
  - Confirm button to finalize booking

#### 2. **DateTimeSelector.jsx** (New)
- Full month calendar view
- Navigate between months
- Select date and time
- Visual feedback for selected dates
- Business hours: 9:00 AM to 6:00 PM
- Holiday and weekend indicators
- Legend explaining indicators

#### 3. **HolidayManagement.jsx** (New)
- Add new holidays with name and date
- View all holidays in card layout
- Delete holidays
- Shows date, day of week, and holiday name
- Real-time updates

#### 4. **App Components Integration**
- Updated AdminAppointmentDashboard to include HolidayManagement
- All components fully styled and responsive

### API Endpoints

#### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment
- `GET /api/appointments/date/{date}` - Get appointments by date
- `GET /api/appointments/customer/{customerId}` - Get customer appointments
- `PUT /api/appointments/{id}/cancel` - Cancel appointment
- `PUT /api/appointments/{id}/complete` - Mark appointment complete

#### Holidays
- `POST /api/holidays` - Create holiday
- `GET /api/holidays` - Get all holidays
- `GET /api/holidays/range?startDate={date}&endDate={date}` - Get holidays by date range
- `DELETE /api/holidays/{id}` - Delete holiday

### Database Entities

The system uses the following entities (already in place):

- **Appointment** - Contains appointment details
- **Holiday** - Contains holiday information
- **Customer** - Customer information
- **Vehicle** - Vehicle details
- **ServiceType** - Service types available
- **User** - User authentication (for admin)

### Styling

Professional, responsive CSS for:
- Modal forms with step indicators
- Calendar with hover effects
- Holiday cards with gradients
- Responsive design for mobile, tablet, and desktop

## How to Run

### Prerequisites
- Java 21+ installed
- MySQL database running
- Node.js 18+ installed
- npm installed

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create database:**
   ```sql
   CREATE DATABASE gvsts_db;
   ```

3. **Update database configuration in `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gvsts_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. **Build and run the backend:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Backend will run on: `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   Frontend will open at: `http://localhost:3000`

## Usage Instructions

### For Customers

1. **Book Appointment:**
   - Click "+ Book Appointment" button on the home page
   - Select desired service type
   - Fill in vehicle and contact details (Step 1)
   - Select appointment date and time from calendar (Step 2)
   - Review and confirm appointment (Step 3)
   - Confirmation message will appear

2. **View Appointments:**
   - Go to the calendar section
   - See all booked appointments displayed on calendar
   - See holidays marked with 🏖️ emoji
   - Click on appointments to view details

### For Admin

1. **Manage Holidays:**
   - Go to Admin Dashboard
   - Find "🏖️ Holiday Management" section
   - Click "+ Add Holiday" button
   - Enter holiday date and name
   - Click "Add Holiday"
   - View all holidays in card layout
   - Delete holidays by clicking delete button

2. **Manage Appointments:**
   - View all appointments in dashboard
   - Change appointment status (Pending, Confirmed, Completed)
   - Cancel appointments with reason
   - Delete appointments

## Key Features

### Smart Calendar
- Automatically disables past dates
- Automatically disables holidays
- Shows weekends with indicator
- Shows all booked appointments with vehicle info
- Smooth month navigation

### Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Mobile-optimized modals
- Touch-friendly buttons and inputs
- Auto-adjusting grid layouts

### Data Validation
- Required field validation
- Holiday date blocking
- Past date blocking
- Email format validation

### User Experience
- Multi-step guided booking process
- Clear visual indicators (steps, holidays, weekends)
- Confirmation before final booking
- Real-time form updates
- Smooth animations and transitions

## File Structure

```
frontend/src/
├── components/
│   ├── BookAppointmentForm.jsx (Enhanced)
│   ├── DateTimeSelector.jsx (New)
│   ├── HolidayManagement.jsx (New)
│   ├── AdminAppointmentDashboard.jsx (Updated)
│   └── ... other components
├── styles/
│   ├── BookAppointmentForm.css (Enhanced)
│   ├── DateTimeSelector.css (New)
│   ├── HolidayManagement.css (New)
│   └── ... other styles
└── api/
    └── apiClient.js (Updated with holiday endpoints)

backend/src/
├── controller/
│   ├── AppointmentController.java
│   └── HolidayController.java
├── service/
│   ├── AppointmentService.java
│   └── HolidayService.java
├── entity/
│   ├── Appointment.java
│   └── Holiday.java
├── dto/
│   ├── AppointmentDTO.java
│   └── HolidayDTO.java
└── repository/
    ├── AppointmentRepository.java
    └── HolidayRepository.java
```

## Testing the System

1. **Test Booking Flow:**
   - Click "Book Appointment" button
   - Go through all 3 steps
   - Verify data is saved correctly

2. **Test Holiday Blocking:**
   - Add a holiday via admin panel
   - Try to book appointment on that date
   - Should see error message

3. **Test Calendar View:**
   - Add multiple appointments
   - Verify they appear on calendar
   - Check holiday indicators work

4. **Test Responsive Design:**
   - Resize browser to test mobile view
   - Test on actual mobile device
   - Verify all buttons and forms work

## API Response Examples

### Successful Appointment Creation
```json
{
  "appointmentId": 1,
  "customerId": 1,
  "vehicleId": 1,
  "appointmentDate": "2025-03-25",
  "appointmentTime": "14:30",
  "serviceName": "Full Service",
  "status": "PENDING",
  "customerName": "John Doe",
  "vehicleRegistration": "ABC-1234",
  "customerEmail": "john@example.com"
}
```

### Holiday Creation
```json
{
  "id": 1,
  "holidayDate": "2025-04-13",
  "name": "New Year"
}
```

## Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify port 8080 is available
- Check Java 21 is installed: `java -version`

### Frontend won't load
- Ensure backend is running on port 8080
- Clear browser cache
- Check npm dependencies: `npm install`
- Verify port 3000 is available

### Appointments not showing on calendar
- Check backend is returning data (check network tab in DevTools)
- Ensure appointments have valid dates
- Check browser console for JavaScript errors

### Holiday blocking not working
- Verify holidays are created in database
- Check holiday dates format (should be YYYY-MM-DD)
- Refresh the page after adding holidays

## Future Enhancements

1. **Email Notifications** - Send confirmation emails
2. **SMS Notifications** - WhatsApp integration for confirmations
3. **Customer Portal** - Customers can view/manage their appointments
4. **Analytics Dashboard** - Appointment statistics and reports
5. **Payment Integration** - Online payment for services
6. **Automated Reminders** - Reminder emails/SMS before appointments
7. **Multi-branch Support** - Manage multiple garage locations
8. **Staff Management** - Assign mechanics to appointments
9. **Inventory Management** - Track spare parts and materials
10. **Rating & Reviews** - Customer feedback system

## Support

For issues or questions, please refer to:
- Backend logs in console output
- Browser DevTools Network tab for API calls
- Database logs for query issues
- Application logs in application.properties configuration

---

**System Version:** 1.0.0
**Last Updated:** March 2025
**Backend:** Spring Boot 3.2.0 with Java 21
**Frontend:** React 18.2.0
