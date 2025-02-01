import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AfterSignup from './components/AfterSignup';
import Selector from './components/Selector';
import LoginPage from './components/Login';
import Dashboard from './components/Dashboard';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/aftersignup" element={<AfterSignup />} />
                <Route path="/timetable" element={<Selector />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </StrictMode >,
)
