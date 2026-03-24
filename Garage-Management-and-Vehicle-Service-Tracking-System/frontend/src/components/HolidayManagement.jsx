import React, { useState, useEffect } from 'react';
import '../styles/HolidayManagement.css';
import { holidayAPI } from '../api/apiClient';

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    holidayDate: '',
    name: ''
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const data = await holidayAPI.getAll();
      // Sort by date
      const sorted = data.sort((a, b) => new Date(a.holidayDate) - new Date(b.holidayDate));
      setHolidays(sorted);
    } catch (err) {
      console.error('Failed to fetch holidays', err);
      alert('Failed to load holidays');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();

    if (!formData.holidayDate || !formData.name) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const holidayData = {
        holidayDate: formData.holidayDate,
        name: formData.name
      };
      
      const created = await holidayAPI.create(holidayData);
      setHolidays(prev => [...prev, created].sort((a, b) => new Date(a.holidayDate) - new Date(b.holidayDate)));
      
      setFormData({
        holidayDate: '',
        name: ''
      });
      setShowForm(false);
      alert('Holiday added successfully!');
    } catch (err) {
      console.error('Failed to add holiday', err);
      alert('Failed to add holiday: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteHoliday = async (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        await holidayAPI.delete(id);
        setHolidays(prev => prev.filter(h => h.id !== id));
        alert('Holiday deleted successfully!');
      } catch (err) {
        console.error('Failed to delete holiday', err);
        alert('Failed to delete holiday');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="holiday-management-section">
      <div className="holiday-header">
        <h2>Holiday Management</h2>
        <button 
          className="btn-add-holiday"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Close' : '+ Add Holiday'}
        </button>
      </div>

      {showForm && (
        <form className="holiday-form" onSubmit={handleAddHoliday}>
          <div className="form-group">
            <label htmlFor="holidayDate">Holiday Date *</label>
            <input
              type="date"
              id="holidayDate"
              name="holidayDate"
              value={formData.holidayDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Holiday Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Christmas, New Year's Day, Independence Day"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => {
                setShowForm(false);
                setFormData({ holidayDate: '', name: '' });
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Holiday
            </button>
          </div>
        </form>
      )}

      <div className="holidays-list">
        {loading ? (
          <div className="loading">Loading holidays...</div>
        ) : holidays.length === 0 ? (
          <div className="empty-state">
            <p>No holidays added yet. Click "+ Add Holiday" to create one.</p>
          </div>
        ) : (
          <div className="holidays-grid">
            {holidays.map(holiday => (
              <div key={holiday.id} className="holiday-card">
                <div className="holiday-date">
                  <div className="date-day">{new Date(holiday.holidayDate).getDate()}</div>
                  <div className="date-month">{new Date(holiday.holidayDate).toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>

                <div className="holiday-details">
                  <h4>{holiday.name}</h4>
                  <p>{formatDate(holiday.holidayDate)} ({getDayOfWeek(holiday.holidayDate)})</p>
                </div>

                <button
                  className="btn-delete"
                  onClick={() => handleDeleteHoliday(holiday.id)}
                  title="Delete holiday"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayManagement;
