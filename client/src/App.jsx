import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard2 from "./components/minorsss/Dashboard2";
import Alert from './layout/Alert';

function App() {
    return (
        <>
            <Alert />
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard2 />} />
                   <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
