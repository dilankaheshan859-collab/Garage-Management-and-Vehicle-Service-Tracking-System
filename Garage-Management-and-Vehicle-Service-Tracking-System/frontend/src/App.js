import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppointmentCalendar from './components/AppointmentCalendar';
import AdminAppointmentDashboard from './components/AdminAppointmentDashboard';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminAppointmentDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage() {
    return (
        <>
            <Hero />
            <AppointmentCalendar />
        </>
    );
}

export default App;
