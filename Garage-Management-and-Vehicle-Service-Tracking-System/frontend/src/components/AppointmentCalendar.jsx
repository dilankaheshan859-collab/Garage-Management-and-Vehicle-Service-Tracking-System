import React, { useState, useEffect } from 'react';
import '../styles/AppointmentCalendar.css';
import BookAppointmentForm from './BookAppointmentForm';
import { appointmentAPI } from '../api/apiClient';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // utility to convert 24‑hour (HH:mm) string to 12‑hour format with AM/PM
  const convertTimeTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    let hours24 = parseInt(hours, 10);
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    hours24 = hours24 % 12;
    hours24 = hours24 ? hours24 : 12;
    return `${String(hours24).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isHoliday = (day) => {
    if (!day) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return holidays.some(holiday => {
      const holidayDate = new Date(holiday.holidayDate);
      return holidayDate.toDateString() === checkDate.toDateString();
    });
  };

  const getHolidayName = (day) => {
    if (!day) return null;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const holiday = holidays.find(h => {
      const holidayDate = new Date(h.holidayDate);
      return holidayDate.toDateString() === checkDate.toDateString();
    });
    return holiday ? holiday.name : null;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const calendarDays = [];
  //add empty cells for days before the month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  //get appointments for a specific day
  const getAppointmentsForDay = (day) => {
    return appointments.filter(apt => {
      if (!apt || !apt.date) return false;

      //normalize to a Date object whether the source is a string or Date
      let aptDateObj;
      try {
        if (typeof apt.date === 'string') {
          // ensure time zone neutrality by forcing midnight
          aptDateObj = new Date(apt.date + 'T00:00:00');
        } else if (apt.date instanceof Date) {
          aptDateObj = apt.date;
        } else {
          aptDateObj = new Date(apt.date);
        }
      } catch (err) {
        return false;
      }

      if (isNaN(aptDateObj.getTime())) return false;

      return (
        aptDateObj.getDate() === day &&
        aptDateObj.getMonth() === currentDate.getMonth() &&
        aptDateObj.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handleAppointmentClick = (appointment) => {
    alert(
      `Appointment Details\n\nCustomer: ${appointment.customerName}\nVehicle: ${appointment.vehicleId}\nTime: ${appointment.time}\nStatus: ${appointment.status}`
    );
  };

  const handleAddAppointment = async (newAppointment) => {
    try {
      const payload = {
        customerName: newAppointment.customerName,
        customerEmail: newAppointment.email,
        customerPhone: newAppointment.contactNumber,
        appointmentDate: newAppointment.date,
        appointmentTime: newAppointment.time, // Already in 24-hour format
        serviceName: newAppointment.service,
        status: newAppointment.status.toUpperCase(),
        notes: newAppointment.additionalNotes,
        vehicleMake: newAppointment.make,
        vehicleModel: newAppointment.model,
        vehicleType: newAppointment.type,
        vehicleYear: newAppointment.year,
        // The user input is a vehicle registration; avoid treating numeric license strings as ID
        vehicleRegistration: newAppointment.vehicleId,
      };

      const created = await appointmentAPI.create(payload);
      
      // convert DTO back to frontend model
      const formatted = {
        id: created.appointmentId,
        date: created.appointmentDate,
        time: convertTimeTo12Hour(created.appointmentTime),
        customerName: created.customerName,
        vehicleId: created.vehicleRegistration || created.vehicleId || '',
        service: created.serviceName || '',
        status: created.status || 'Pending'
      };
      setAppointments(prev => [...prev, formatted]);
      
      // navigate calendar to new date if necessary
      try {
        const dt = new Date(formatted.date + 'T00:00:00');
        if (!isNaN(dt.getTime())) {
          setCurrentDate(new Date(dt.getFullYear(), dt.getMonth(), 1));
        }
      } catch (err) {}
      
      // Show success alert only after successful save
      alert('Appointment booked successfully!');
    } catch (err) {
      console.error('Failed to add appointment', err);
      alert('Could not save appointment: ' + (err.message || 'Unknown error'));
    }
  };


  const handleEditAppointment = async (updatedAppointment) => {
    try {
      const dto = {
        customerName: updatedAppointment.customerName,
        customerEmail: updatedAppointment.email,
        customerPhone: updatedAppointment.contactNumber,
        appointmentDate: updatedAppointment.date,
        appointmentTime: updatedAppointment.time, // Already in 24-hour format
        serviceName: updatedAppointment.service,
        status: updatedAppointment.status.toUpperCase(),
        notes: updatedAppointment.additionalNotes,
        vehicleMake: updatedAppointment.make,
        vehicleModel: updatedAppointment.model,
        vehicleType: updatedAppointment.type,
        vehicleYear: updatedAppointment.year,
        vehicleRegistration: updatedAppointment.vehicleId,
      };
      const response = await appointmentAPI.update(updatedAppointment.id, dto);
      // update in state
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === response.appointmentId
            ? {
                ...apt,
                date: response.appointmentDate,
                time: convertTimeTo12Hour(response.appointmentTime),
                customerName: response.customerName,
                service: response.serviceName,
                status: response.status
              }
            : apt
        )
      );
      setEditingAppointment(null);
      // Show success alert only after successful update
      alert('Appointment updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update appointment: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentAPI.delete(appointmentId);
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      } catch (err) {
        console.error('Delete failed', err);
        alert('Could not delete appointment');
      }
    }
  };

  // load existing appointments & holidays & poll for changes
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        // Fetch appointments
        const appointmentData = await appointmentAPI.getAll();
        if (cancelled) return;
        const formattedAppointments = appointmentData.map(a => ({
          id: a.appointmentId,
          date: a.appointmentDate,
          time: convertTimeTo12Hour(a.appointmentTime),
          customerName: a.customerName,
          vehicleId: a.vehicleRegistration || a.vehicleId || '',
          service: a.serviceName || '',
          status: a.status || 'Pending'
        }));
        setAppointments(formattedAppointments);

        // Fetch holidays
        const holidayData = await fetch('http://localhost:8080/api/holidays').then(res => res.json());
        if (!cancelled) {
          setHolidays(holidayData);
        }
      } catch (err) {
        console.error('could not fetch data', err);
      }
    };
    load();
    const interval = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="appointment-calendar-wrapper">
      <div className="view-calendar-toggle">
        <button
          className="view-calendar-btn"
          onClick={() => setIsCalendarOpen(true)}
        >
          View Calendar
        </button>
      </div>

      {/* container with id so navbar link can scroll here */}
      <div id="booking">
        <BookAppointmentForm 
          onAddAppointment={handleAddAppointment}
          onEditAppointment={handleEditAppointment}
          editingAppointment={editingAppointment}
          onCancelEdit={() => setEditingAppointment(null)}
          holidays={holidays}
        />
      </div>

      {isCalendarOpen && (
        <div className="calendar-popup-overlay" onClick={() => setIsCalendarOpen(false)}>
          <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-popup-header">
              <h3>All Bookings</h3>
              <button className="calendar-popup-close" onClick={() => setIsCalendarOpen(false)}>
                ✕
              </button>
            </div>

            <div className="appointment-calendar-container">
              <div className="calendar-header">
                <button className="nav-button" onClick={handlePreviousMonth}>
                  ← Previous
                </button>
                <h2 className="month-year">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button className="nav-button" onClick={handleNextMonth}>
                  Next →
                </button>
              </div>

              <div className="calendar-grid">
                {/* Days of Week Header */}
                {daysOfWeek.map(day => (
                  <div key={day} className="day-header">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day, index) => {
                  const isHolidayDay = isHoliday(day);
                  const holidayName = getHolidayName(day);

                  return (
                    <div key={index} className={`calendar-cell ${isHolidayDay ? 'holiday' : ''}`}>
                      {day && (
                        <>
                          <div className="day-number">
                            {day}
                            {isHolidayDay && <span className="holiday-indicator" title={holidayName}>🏖️</span>}
                          </div>
                          <div className="appointments-container">
                            {getAppointmentsForDay(day).map(appointment => (
                              <div
                                key={appointment.id}
                                className={`appointment-badge ${appointment.status.toLowerCase()}`}
                                title={`${appointment.customerName} - ${appointment.vehicleId}`}
                              >
                                <div className="badge-content">
                                  <span className="vehicle-id">{appointment.vehicleId}</span>
                                  <span className="time">{appointment.time}</span>
                                </div>
                                <div className="badge-actions">
                                  <button
                                    className="badge-btn edit-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingAppointment(appointment);
                                    }}
                                    title="Edit appointment"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className="badge-btn delete-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteAppointment(appointment.id);
                                    }}
                                    title="Delete appointment"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
