import React, { useState } from 'react';
import '../styles/ServiceSelection.css';

const ServiceSelection = ({ onServiceSelect, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Services');

  const services = {
    'All Services': [
      'Full Service',
      'Service (Oil change only)',
      'Tune up',
      'Engine Scan',
      'Electrical Work',
      'Detailing',
      'Auto A/C Repair',
      'Wheel Alignment',
      'General running repairs',
      'Auto transmission Fluid Change',
      'Interior Detailing',
      'Cut and Polish'

    ],
    'Service Section': [
      'Full Service',
      'Service (Oil change only)',
      
    ],
    'Electrical/ Tune up Section': [
      'Electrical Work',
      'Tune up',
      'Engine Scan',
      'Auto A/C Repair'
    ],
    'Running Repair Section': [
      'Wheel Alignment',
      'General running repairs',
      'Auto transmission Fluid Change',
    ],
    'Detailing section': [
      'Interior Detailing',
      'Cut and Polish'
    ]
  };

  const categories = [
    'All Services',
    'Service Section',
    'Electrical/ Tune up Section',
    'Running Repair Section',
    'Detailing section'
  ];

  const currentServices = services[selectedCategory] || [];

  const handleBookNow = (service) => {
    onServiceSelect(service);
  };

  return (
    <div className="service-selection-overlay">
      <div className="service-selection-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h1 className="booking-title">Booking</h1>

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="services-list">
          {currentServices.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-name">{service}</div>
              <button
                className="book-now-btn"
                onClick={() => handleBookNow(service)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;
