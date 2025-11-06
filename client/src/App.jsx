import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/minorsss/Login";
import "./App.css";
import Dashboard2 from "./components/minorsss/Dashboard2";
import { AAAA1 } from "./components/AAAA1";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard2 />} />
                <Route path="/1" element={<AAAA1 />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
