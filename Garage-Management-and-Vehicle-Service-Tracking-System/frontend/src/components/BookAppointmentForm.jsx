import React, { useState, useEffect } from 'react';
import '../styles/BookAppointmentForm.css';
import ServiceSelection from './ServiceSelection';
import DateTimeSelector from './DateTimeSelector';

const BookAppointmentForm = ({ onAddAppointment, onEditAppointment, editingAppointment, onCancelEdit, holidays = [] }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Service, 1: Details, 2: DateTime, 3: Confirmation
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    contactNumber: '',
    vehicleNo: '',
    make: '',
    model: '',
    type: '',
    year: '',
    additionalNotes: '',
    date: '',
    time: '',
    service: '',
    status: 'Pending'
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const vehicleMakes = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Nissan','BYD', 'Deepal','Mazda', 'Ford', 'Volkswagen', 'Kia', 'MG', 'Suzuki'];
  const vehicleModels = {
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Yaris', 'Fortuner'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'City'],
    'BMW': ['3 Series', '5 Series', 'X5', 'X3', 'Z4'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLA', 'GLE', 'S-Class'],
    'Audi': ['A4', 'A6', 'Q3', 'Q5', 'TT'],
    'Hyundai': ['Santro', 'i20', 'Creta', 'Tucson', 'Elantra'],
    'Nissan': ['Altima', 'Rogue', 'Sentra', 'Qashqai'],
    'Mazda': ['Mazda3', 'Mazda6', 'CX-5'],
    'Ford': ['Focus', 'Escape', 'Explorer', 'Mustang'],
    'Volkswagen': ['Golf', 'Jetta', 'Passat', 'Tiguan'],
    'Kia': ['Picanto', 'Rio', 'Sportage', 'Telluride'],
    'MG': ['Hector', 'Astor', 'ZS EV'],
    'Suzuki': ['Swift', 'Ertiga', 'Vitara']
  };
  const vehicleTypes = ['Car', 'SUV', 'Sedan', 'Coupe', 'Truck', 'Van', 'Hatchback'];

  // hide the form when a "hideBooking" event is fired
  useEffect(() => {
    const handler = () => {
      setShowForm(false);
      resetForm();
      if (editingAppointment) {
        onCancelEdit && onCancelEdit();
      }
    };
    window.addEventListener('hideBooking', handler);
    return () => window.removeEventListener('hideBooking', handler);
  }, [editingAppointment, onCancelEdit]);

  // show service selection when instructed by navbar
  useEffect(() => {
    const handler = () => {
      setShowForm(true);
      setCurrentStep(0);
      if (editingAppointment) {
        onCancelEdit && onCancelEdit();
      }
    };
    window.addEventListener('showBooking', handler);
    return () => window.removeEventListener('showBooking', handler);
  }, [editingAppointment, onCancelEdit]);

  //update form when editing appointment changes
  useEffect(() => {
    if (editingAppointment) {
      setShowForm(true);
      setCurrentStep(1);
      setFormData({
        customerName: editingAppointment.customerName,
        email: editingAppointment.email || '',
        contactNumber: editingAppointment.contactNumber || '',
        vehicleNo: editingAppointment.vehicleId,
        make: editingAppointment.make || '',
        model: editingAppointment.model || '',
        type: editingAppointment.type || '',
        year: editingAppointment.year || '',
        additionalNotes: editingAppointment.additionalNotes || '',
        date: editingAppointment.date,
        time: editingAppointment.time, // Already in 24-hour format
        service: editingAppointment.service || '',
        status: editingAppointment.status
      });
      setSelectedService(editingAppointment.service || '');
    }
  }, [editingAppointment]);

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      customerName: '',
      email: '',
      contactNumber: '',
      vehicleNo: '',
      make: '',
      model: '',
      type: '',
      year: '',
      additionalNotes: '',
      date: '',
      time: '',
      service: '',
      status: 'Pending'
    });
    setSelectedService('');
    setSelectedDateTime(null);
  };

  const handleServiceSelect = (selectedService) => {
    setSelectedService(selectedService);
    setFormData(prev => ({
      ...prev,
      service: selectedService
    }));
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinueToDateTime = (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.vehicleNo || !formData.make || !formData.model || !formData.type || !formData.contactNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    setCurrentStep(2);
  };

  const handleDateTimeSelect = (date, time) => {
    setSelectedDateTime({ date, time });
    setFormData(prev => ({
      ...prev,
      date,
      time
    }));
    setCurrentStep(3);
  };

  const isHoliday = (dateString) => {
    if (!dateString) return false;
    const selectedDate = new Date(dateString);
    return holidays.some(holiday => {
      const holidayDate = new Date(holiday.holidayDate);
      return holidayDate.toDateString() === selectedDate.toDateString();
    });
  };

  const getHolidayName = (dateString) => {
    if (!dateString) return null;
    const selectedDate = new Date(dateString);
    const holiday = holidays.find(h => {
      const holidayDate = new Date(h.holidayDate);
      return holidayDate.toDateString() === selectedDate.toDateString();
    });
    return holiday ? holiday.name : null;
  };

  const convertTimeTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    let hours24 = parseInt(hours);
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    hours24 = hours24 % 12;
    hours24 = hours24 ? hours24 : 12;
    return `${String(hours24).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.vehicleNo || !formData.date || !formData.time || !formData.service) {
      alert('Please fill in all fields');
      return;
    }

    // Check if selected date is a holiday
    if (isHoliday(formData.date)) {
      const holidayName = getHolidayName(formData.date);
      alert(`Cannot book appointment on ${holidayName}. The garage is closed on holidays.`);
      return;
    }

    if (editingAppointment) {
      // update existing appointment
      const updatedAppointment = {
        ...editingAppointment,
        date: formData.date,
        customerName: formData.customerName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        vehicleId: formData.vehicleNo,
        make: formData.make,
        model: formData.model,
        type: formData.type,
        year: formData.year,
        additionalNotes: formData.additionalNotes,
        service: formData.service,
        status: formData.status,
        time: formData.time // Keep 24-hour format
      };
      onEditAppointment(updatedAppointment);
    } else {
      // create new appointment
      const newAppointment = {
        id: Date.now(),
        date: formData.date,
        customerName: formData.customerName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        vehicleId: formData.vehicleNo,
        make: formData.make,
        model: formData.model,
        type: formData.type,
        year: formData.year,
        additionalNotes: formData.additionalNotes,
        service: formData.service,
        status: formData.status,
        time: formData.time // Keep 24-hour format
      };
      onAddAppointment(newAppointment);
    }

    // reset form
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="book-appointment-section">
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            {currentStep === 0 && (
              <ServiceSelection 
                onServiceSelect={handleServiceSelect}
                onClose={() => {
                  setShowForm(false);
                  resetForm();
                  if (editingAppointment) {
                    onCancelEdit();
                  }
                }}
              />
            )}

            {currentStep === 1 && (
              <form className="appointment-form step-1" onSubmit={handleContinueToDateTime}>
                <div className="form-header">
                  <h3>Step 1: Vehicle & Contact Details</h3>
                  <span className="step-indicator">1 / 3</span>
                </div>

                <div className="form-content">
                  {/* Vehicle Information Section */}
                  <div className="form-section">
                    <h4>Vehicle Information</h4>
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="vehicleNo">Vehicle No *</label>
                        <input
                          type="text"
                          id="vehicleNo"
                          name="vehicleNo"
                          value={formData.vehicleNo}
                          onChange={handleInputChange}
                          placeholder="e.g., ABC-1234"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="make">Make *</label>
                        <select
                          id="make"
                          name="make"
                          value={formData.make}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Make</option>
                          {vehicleMakes.map(make => (
                            <option key={make} value={make}>{make}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="model">Model *</label>
                        <select
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.make}
                        >
                          <option value="">Select Model</option>
                          {formData.make && vehicleModels[formData.make]?.map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="type">Type *</label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Type</option>
                          {vehicleTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="year">Vehicle Year</label>
                        <input
                          type="number"
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          min="1900"
                          max="2100"
                          placeholder="e.g., 2023"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="form-section">
                    <h4>Contact Information</h4>
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number (WhatsApp) *</label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., 0760255104"
                          required
                        />
                        <small>📱 Booking confirmation will be sent via WhatsApp</small>
                      </div>

                      <div className="form-group">
                        <label htmlFor="customerName">Your Name *</label>
                        <input
                          type="text"
                          id="customerName"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Additional Details Section */}
                  <div className="form-section">
                    <h4>Additional Details</h4>
                    
                    <div className="form-group">
                      <label htmlFor="additionalNotes">Additional Notes</label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions or requests..."
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Service Type</label>
                      <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        readOnly
                        placeholder="Selected service"
                        className="readonly-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                      if (editingAppointment) {
                        onCancelEdit();
                      }
                    }}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-continue">
                    Next: Choose Date & Time →
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <DateTimeSelector 
                onDateTimeSelect={handleDateTimeSelect}
                onBack={() => setCurrentStep(1)}
                holidays={holidays}
                selectedService={selectedService}
              />
            )}

            {currentStep === 3 && (
              <form className="appointment-form step-3" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>Step 3: Confirm Appointment</h3>
                  <span className="step-indicator">3 / 3</span>
                </div>

                <div className="confirmation-content">
                  <div className="confirmation-section">
                    <h4>Vehicle Details</h4>
                    <p><strong>Vehicle No:</strong> {formData.vehicleNo}</p>
                    <p><strong>Make:</strong> {formData.make}</p>
                    <p><strong>Model:</strong> {formData.model}</p>
                    <p><strong>Type:</strong> {formData.type}</p>
                  </div>

                  <div className="confirmation-section">
                    <h4>Your Details</h4>
                    <p><strong>Name:</strong> {formData.customerName}</p>
                    <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
                    {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                  </div>

                  <div className="confirmation-section">
                    <h4>Appointment Details</h4>
                    <p><strong>Service:</strong> {formData.service}</p>
                    <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {convertTimeTo12Hour(formData.time)}</p>
                  </div>

                  {formData.additionalNotes && (
                    <div className="confirmation-section">
                      <h4>Notes</h4>
                      <p>{formData.additionalNotes}</p>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setCurrentStep(2)}
                  >
                    ← Back
                  </button>
                  <button type="submit" className="btn-confirm">
                    ✓ Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentForm;
