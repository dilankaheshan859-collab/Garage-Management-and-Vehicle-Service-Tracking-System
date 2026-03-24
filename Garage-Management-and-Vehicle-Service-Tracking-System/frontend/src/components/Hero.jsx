import React from 'react';
import { Truck, ArrowRight, MapPin, Users, Clock } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
  const handleBookAppointment = () => {
    const appointmentSection = document.querySelector('.appointment-calendar-container');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Trigger the booking modal/form in AppointmentCalendar via event
    window.dispatchEvent(new Event('showBooking'));
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Column */}
        <div className="hero-left">
          {/* Badge */}
          <div className="badge">
            <Truck size={16} className="badge-icon" />
            <span>Premium Auto Care Services</span>
          </div>

          {/* Headline */}
          <h1 className="headline">Premium Auto Care & Digital Service Tracking</h1>

          {/* Subtext */}
          <p className="subtext">
            Experience transparency with real-time job tracking, digital records, and expert collision repairs. Our certified mechanics deliver excellence in every service, backed by over 15 years of industry expertise.
          </p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleBookAppointment}>
              Book an Appointment
              <ArrowRight size={18} className="btn-icon" />
            </button>
            <button className="btn btn-secondary">Learn More</button>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right">
          <div className="blue-container">
            {/* Car Icon - Center Visual */}
            <div className="car-icon-container">
              <svg
                className="car-icon"
                viewBox="0 0 200 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Car body */}
                <path
                  d="M 40 80 L 50 50 L 150 50 L 160 80 L 160 110 Q 160 120 150 120 L 50 120 Q 40 120 40 110 Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Windows */}
                <rect x="60" y="60" width="35" height="25" fill="#e0f2fe" stroke="#ffffff" strokeWidth="1" />
                <rect x="105" y="60" width="35" height="25" fill="#e0f2fe" stroke="#ffffff" strokeWidth="1" />
                {/* Wheels */}
                <circle cx="70" cy="120" r="12" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                <circle cx="130" cy="120" r="12" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                {/* Headlights */}
                <circle cx="42" cy="85" r="4" fill="#fbbf24" />
                <circle cx="48" cy="85" r="4" fill="#fbbf24" />
              </svg>
            </div>

            {/* Top Right Card */}
            <div className="card card-top-right">
              <div className="card-icon">
                <MapPin size={20} />
              </div>
              <div className="card-content">
                <p className="card-text">Real-time Tracking: Monitor your vehicle status anytime</p>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div className="card card-bottom-left">
              <div className="card-icon">
                <Users size={20} />
              </div>
              <div className="card-content">
                <p className="card-text">Expert Mechanics: Certified professionals with years of experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
