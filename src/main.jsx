import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AfterSignup from './components/AfterSignup';
import Selector from './components/Selector';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/aftersignup" element={<AfterSignup />} />
                <Route path="/select" element={<Selector />} />
            </Routes>
        </BrowserRouter>
    </StrictMode >,
)
