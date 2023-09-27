import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './style/all.min.css';
import Login from '@containers/Login';
import UserList from '@containers/UserList';
import Admin from '@containers/Admin';
import Broker from '@containers/Broker';
import Stock from '@containers/Stock';
import History from '@containers/History';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Broker" element={<Broker />} />
                    <Route path="/Stock" element={<Stock />} />
                    <Route path="/History" element={<History />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
