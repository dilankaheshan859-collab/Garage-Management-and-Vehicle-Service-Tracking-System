import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminAppointmentDashboard.css';
import HolidayManagement from './HolidayManagement';

const AdminAppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [notification, setNotification] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/appointments`);
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
        setAppointments(appointments.filter(apt => apt.appointmentId !== appointmentId));
      } catch (err) {
        setError('Failed to delete appointment');
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Find the appointment to update
      const appointmentToUpdate = appointments.find(apt => apt.appointmentId === appointmentId);
      if (!appointmentToUpdate) return;

      // Create updated appointment object
      const updatedAppointment = {
        ...appointmentToUpdate,
        status: newStatus
      };

      await axios.put(`${API_BASE_URL}/appointments/${appointmentId}`, updatedAppointment);

      // Update local state
      setAppointments(appointments.map(apt =>
        apt.appointmentId === appointmentId
          ? { ...apt, status: newStatus }
          : apt
      ));
    } catch (err) {
      setError('Failed to update appointment status');
      console.error('Error updating appointment status:', err);
    }
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setCancellationReason('');
    setShowCancelModal(true);
  };

  const submitCancellation = async () => {
    if (!cancellationReason.trim()) {
      alert('Please enter a reason for cancellation');
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/appointments/${selectedAppointment.appointmentId}/cancel`, {
        reason: cancellationReason.trim()
      });

      setAppointments(appointments.map(apt =>
        apt.appointmentId === selectedAppointment.appointmentId
          ? { ...apt, status: 'CANCELLED', cancellationReason: cancellationReason.trim() }
          : apt
      ));

      setShowCancelModal(false);
      setSelectedAppointment(null);
      setCancellationReason('');
      showNotification('Appointment cancelled successfully', 'success');
    } catch (err) {
      setError('Failed to cancel appointment');
      console.error('Error cancelling appointment:', err);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/appointments/${appointmentId}/complete`);

      setAppointments(appointments.map(apt =>
        apt.appointmentId === appointmentId
          ? { ...apt, status: 'COMPLETED' }
          : apt
      ));

      showNotification('Appointment marked as completed', 'success');
    } catch (err) {
      setError('Failed to complete appointment');
      console.error('Error completing appointment:', err);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#10b981'; // green
      case 'pending':
        return '#f59e0b'; // amber
      case 'completed':
        return '#3b82f6'; // blue
      case 'cancelled':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const statusOptions = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">{error}</div>
        <button onClick={fetchAppointments} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="dashboard-header">
        <h1>Appointment Management Dashboard</h1>
        <button onClick={fetchAppointments} className="refresh-btn">
          Refresh
        </button>
      </div>

      <HolidayManagement />

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Customer Name</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No appointments found</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{formatDate(appointment.appointmentDate)}</td>
                  <td>{formatTime(appointment.appointmentTime)}</td>
                  <td>{appointment.customerName || 'N/A'}</td>
                  <td>{appointment.vehicleRegistration || 'N/A'}</td>
                  <td>{appointment.serviceName || appointment.service || 'N/A'}</td>
                  <td>
                    <select
                      value={appointment.status || 'PENDING'}
                      onChange={(e) => handleStatusChange(appointment.appointmentId, e.target.value)}
                      className="status-dropdown"
                    >
                      {statusOptions.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="actions-cell">
                    {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                      <>
                        <button
                          onClick={() => handleCompleteAppointment(appointment.appointmentId)}
                          className="complete-btn"
                        >
                          Mark Done
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteAppointment(appointment.appointmentId)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cancellation Modal */}
      {showCancelModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cancel Appointment</h2>
              <button onClick={() => setShowCancelModal(false)} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel the appointment for <strong>{selectedAppointment.customerName}</strong> on <strong>{formatDate(selectedAppointment.appointmentDate)}</strong> at <strong>{selectedAppointment.appointmentTime}</strong>?</p>

              <label htmlFor="cancellation-reason">Reason for Cancellation:</label>
              <textarea
                id="cancellation-reason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this appointment..."
                required
              />
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowCancelModal(false)} className="modal-btn modal-btn-cancel">
                Cancel
              </button>
              <button onClick={submitCancellation} className="modal-btn modal-btn-confirm">
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentDashboard;