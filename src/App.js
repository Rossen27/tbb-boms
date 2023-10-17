import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './style/all.min.css';
import Login from '@containers/Login';
import UserList from '@containers/UserList';
import Admin from '@containers/Admin';
import Broker from '@containers/Broker';
import Stock from '@containers/Stock';
import History from '@containers/History';
import Order from '@containers/Order';
import DealOrder from '@containers/DealOrder';
import StkDeposit from '@containers/StkDeposit';
import StkLimit from '@containers/StkLimit';
import TradeReport from '@containers/TradeReport';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/BSOMS">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Broker" element={<Broker />} />
                    <Route path="/Stock" element={<Stock />} />
                    <Route path="/StkLimit" element={<StkLimit />} />
                    <Route path="/History" element={<History />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/DealOrder" element={<DealOrder />} />
                    <Route path="/StkDeposit" element={<StkDeposit />} />
                    <Route path="/TradeReport" element={<TradeReport />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
