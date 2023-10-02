import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {  AddUrl, FAQ } from './pages';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/add-url" element={<AddUrl />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/" element={<Navigate to="/add-url" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
export { Router };
