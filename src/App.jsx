import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Alert from './components/widgets/Alert';

function App() {
    let showAlert = false;
    return (
        <>
            {showAlert && <Alert />}
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
