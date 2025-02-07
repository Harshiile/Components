import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimeTable from './components/TimeTable';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
)
