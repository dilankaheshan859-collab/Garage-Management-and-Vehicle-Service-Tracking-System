import React, { useState, useEffect } from 'react';
import '../styles/DateTimeSelector.css';

const DateTimeSelector = ({ onDateTimeSelect, onBack, holidays = [], selectedService }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Business hours: 9 AM to 6 PM
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

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

  const isWeekend = (day) => {
    if (!day) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  const isDateDisabled = (day) => {
    if (!day) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (checkDate < today) return true;
    
    // Disable holidays
    if (isHoliday(day)) return true;
    
    return false;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    const today = new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    if (newDate >= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    if (isDateDisabled(day)) return;
    
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    onDateTimeSelect(dateString, selectedTime);
  };

  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${String(hour).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="datetime-selector">
      <div className="form-header">
        <h3>Step 2: Choose Date & Time</h3>
        <span className="step-indicator">2 / 3</span>
      </div>

      <div className="datetime-content">
        <div className="calendar-section">
          <h4>Select Date</h4>
          
          <div className="calendar-header">
            <button 
              className="nav-button" 
              onClick={handlePreviousMonth}
              type="button"
            >
              ← Previous
            </button>
            <h5 className="month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h5>
            <button 
              className="nav-button" 
              onClick={handleNextMonth}
              type="button"
            >
              Next →
            </button>
          </div>

          <div className="calendar-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const disabled = isDateDisabled(day);
              const isHolidayDay = day && isHoliday(day);
              const holiday = day && getHolidayName(day);
              const isWeekendDay = day && isWeekend(day);
              const isSelected = day && selectedDate && 
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={index}
                  className={`calendar-day ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isHolidayDay ? 'holiday' : ''}`}
                  onClick={() => !disabled && handleDateSelect(day)}
                  title={holiday ? `Holiday: ${holiday}` : ''}
                >
                  {day && (
                    <>
                      <span className="day-number">{day}</span>
                      {isHolidayDay && <span className="holiday-badge">🏖️</span>}
                      {isWeekendDay && !isHolidayDay && <span className="weekend-badge">⌛</span>}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot selected-sample"></span>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <span className="legend-emoji">🏖️</span>
              <span>Holiday</span>
            </div>
            <div className="legend-item">
              <span className="legend-emoji">⌛</span>
              <span>Weekend</span>
            </div>
          </div>
        </div>

        <div className="time-section">
          <h4>Select Time</h4>
          
          {selectedDate ? (
            <>
              <div className="selected-date-display">
                <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

              <div className="time-slots">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {convertTo12Hour(time)}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <div className="selected-time-display">
                  <strong>Selected Time:</strong> {convertTo12Hour(selectedTime)}
                </div>
              )}
            </>
          ) : (
            <div className="no-date-message">
              <p>👈 Please select a date from the calendar</p>
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="btn-cancel"
          onClick={onBack}
        >
          ← Back
        </button>
        <button 
          type="button" 
          className="btn-continue"
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
        >
          Next: Confirm Appointment →
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelector;
