import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AfterSignup from './components/AfterSignup';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/aftersignup" element={<AfterSignup />} />
            </Routes>
        </BrowserRouter>
    </StrictMode >,
)
