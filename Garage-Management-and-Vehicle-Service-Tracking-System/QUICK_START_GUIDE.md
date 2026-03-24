# Quick Start Guide - Appointment Booking System

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Backend (Java Spring Boot)

```bash
# Open terminal/PowerShell
cd "e:\ITP\ITP Project\Garage-Management-and-Vehicle-Service-Tracking-System\backend"

# Build the project
mvn clean install

# Run the backend
mvn spring-boot:run
```

✅ **Expected Output:** `Tomcat started on port(s): 8080 (http)`

**Backend running at:** `http://localhost:8080`

### Step 2: Start the Frontend (React)

```bash
# Open another terminal/PowerShell
cd "e:\ITP\ITP Project\Garage-Management-and-Vehicle-Service-Tracking-System\frontend"

# Install dependencies (if not already done)
npm install

# Start React development server
npm start
```

✅ **Expected:** Browser automatically opens to `http://localhost:3000`

---

## 📋 Testing the Features

### Test 1: Book an Appointment (Customer)

1. Click **"+ Book Appointment"** button on home page
2. Select a **Service Category** (e.g., "Full Service")
3. **Fill Step 1 - Vehicle & Contact Details:**
   - Vehicle No: ABC-1234
   - Make: Toyota
   - Model: Corolla
   - Type: Car
   - Contact Number: 0760255104
   - Your Name: John Doe
   - Email: john@example.com
   - Notes: (optional)
   
4. Click **"Next: Choose Date & Time →"**

5. **Fill Step 2 - Select Date & Time:**
   - Click on a date on the calendar (must be future date, not holiday)
   - Select a time slot (9:00 AM - 6:00 PM)
   - Click **"Next: Confirm Appointment →"**

6. **Step 3 - Confirm:**
   - Review all details
   - Click **"✓ Confirm Appointment"**
   - Success message appears ✅

7. **Verify:** 
   - Scroll down to calendar
   - New appointment should appear on selected date

### Test 2: Add a Holiday (Admin)

1. Go to **Admin Dashboard** (top-right menu)
2. Find **"🏖️ Holiday Management"** section at the top
3. Click **"+ Add Holiday"** button
4. **Fill details:**
   - Holiday Date: Select a future date (e.g., April 13, 2025)
   - Holiday Name: "Easter Sunday"
   - Click **"Add Holiday"**
   
5. **Verify:**
   - Holiday appears in card list
   - Holiday date is marked with 🏖️ in calendar
   - Try to book appointment on that date - should show error!

### Test 3: Verify Holiday Blocking

1. Try to book an appointment on a holiday date
2. You should see error: **"Cannot book appointment on [Holiday Name]. The garage is closed on holidays."**

### Test 4: View All Appointments in Calendar

1. **Go to home page calendar section**
2. See all booked appointments on their dates
3. Each appointment shows vehicle number and time
4. Click previous/next buttons to change months

### Test 5: Delete Holiday (Admin)

1. In Holiday Management section
2. Find the holiday card
3. Click 🗑️ (delete emoji button)
4. Confirm deletion
5. Holiday is removed from list and calendar

---

## 🎨 UI Features to Check

### Booking Form Features
✅ Multi-step form in modal popup  
✅ Step indicator (1/3, 2/3, 3/3)  
✅ Vehicle dropdowns with make/model options  
✅ WhatsApp number field with note  
✅ Additional notes textarea  
✅ Email validation  
✅ Back and Next buttons  
✅ Beautiful blue and white color scheme  

### Calendar Features
✅ Shows full month calendar  
✅ 🏖️ Emoji for holidays  
✅ ⌛ Emoji for weekends  
✅ Appointments in colored badges  
✅ Click to edit/delete appointments  
✅ Navigate between months  
✅ Disable past dates automatically  

### Holiday Management Features
✅ Orange/yellow theme  
✅ Card layout with date display  
✅ Edit holiday name and date  
✅ Delete with confirmation  
✅ Shows day of week  
✅ Real-time updates  

---

## 🐛 Troubleshooting

### Problem: "Unable to connect to localhost:8080"
**Solution:**
- Make sure MySQL is running
- Check if backend started successfully (look for "Tomcat started on port(s): 8080")
- Make sure port 8080 is not blocked by firewall
- Try: `netstat -ano | findstr :8080` (Windows PowerShell)

### Problem: "Cannot GET /api/holidays"
**Solution:**
- Backend might not have started yet
- Wait 5-10 seconds after starting backend
- Refresh the browser
- Check browser console (F12 → Console tab) for errors

### Problem: "React app won't start"
**Solution:**
- Delete node_modules folder: `rm -r node_modules` (PowerShell: `Remove-Item -r node_modules`)
- Reinstall: `npm install`
- Start again: `npm start`
- Make sure port 3000 is available

### Problem: "Form won't submit"
**Solution:**
- Make sure all required fields are filled (marked with *)
- Check for validation errors (red borders)
- See browser console for JavaScript errors (F12)
- Make sure selected date is not a holiday

### Problem: "Holiday dates not showing in calendar"
**Solution:**
- Refresh the page (F5)
- Check if holiday was saved to database
- Try adding holiday again
- Wait a moment for API response

### Problem: "Appointments not saving"
**Solution:**
- Check browser console for errors
- Verify backend is running
- Check network tab (F12 → Network) to see API response
- Ensure all form fields are valid
- Try smaller appointment details first

---

## 📱 Responsive Design

The system works great on all devices:

- **Desktop:** Full 2-column calendar layout
- **Tablet:** Stacked layout with full-width elements
- **Mobile:** Single column, touch-optimized buttons

Try resizing your browser to see responsive design in action!

---

## 🔧 Configuration

### Backend Configuration
**File:** `backend/src/main/resources/application.properties`

Update these if needed:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/gvsts_db
spring.datasource.username=root
spring.datasource.password=Dula#123

# Server port
server.port=8080
```

### Frontend Configuration
**File:** `frontend/src/api/apiClient.js`

API Base URL (usually doesn't need changes):
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 📊 Data Flow

```
User clicks "Book Appointment"
        ↓
Service Selection (Step 0)
        ↓
Vehicle & Contact Details (Step 1)
        ↓
Date & Time Selection (Step 2) - Calendar shows holidays
        ↓
Confirmation (Step 3)
        ↓
POST /api/appointments → Backend saves to database
        ↓
GET /api/appointments → Calendar fetches and displays
        ↓
GET /api/holidays → Calendar fetches and marks holidays
```

---

## 🎯 Key Features Summary

| Feature | Location | How to Use |
|---------|----------|-----------|
| Book Appointment | Home page button | Click → Fill form → Confirm |
| View Appointments | Calendar grid | Scroll calendar to see dates with appointments |
| Manage Holidays | Admin Dashboard | Add/Delete holidays with date and name |
| Block Holidays | Automatic | When booking, dates with holidays are blocked |
| Edit Appointment | Calendar | Click edit icon on appointment badge |
| Delete Appointment | Calendar | Click delete icon on appointment badge |
| Admin Dashboard | Top menu | View all appointments, manage holidays |

---

## ✅ Verification Checklist

After starting both backend and frontend:

- [ ] Frontend loads at `http://localhost:3000`
- [ ] "Book Appointment" button is visible
- [ ] Can select a service type
- [ ] Can fill vehicle and contact details
- [ ] Can select date and time from calendar
- [ ] Can confirm appointment
- [ ] Appointment appears on calendar
- [ ] Can access Admin Dashboard
- [ ] Can add a holiday
- [ ] Holiday appears with 🏖️ indicator
- [ ] Cannot book on holiday dates
- [ ] Can delete holidays
- [ ] Mobile view is responsive
- [ ] No errors in browser console

---

## 🆘 Need Help?

1. **Check the console:** F12 → Console/Network tabs
2. **Check backend logs:** Look at PowerShell/terminal where backend is running
3. **Check database:** Make sure MySQL is running and database exists
4. **Restart:** This often fixes issues - kill both servers with Ctrl+C and restart
5. **Clear cache:** Close browser, clear cookies and cache, reopen

---

**Happy Testing! 🎉**

Once everything works, try:
- Adding multiple holidays
- Booking multiple appointments on different dates
- Testing on mobile device
- Testing edge cases (holidays, weekends, past dates)

For detailed documentation, see: `APPOINTMENT_BOOKING_IMPLEMENTATION.md`
