import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage() {
    return (
        <Hero />
    );
}

export default App;
