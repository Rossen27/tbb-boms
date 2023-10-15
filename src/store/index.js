import LayoutContext from './LayoutStore';
import LoginContext from '@containers/Login/LoginStore';
import UserListContext from '@containers/UserList/UserListStore';
import AuthContext from './AuthStore';
import AdminContext from '@containers/Admin/AdminStore';
import BrokerContext from '@containers/Broker/BrokerStore';
import StockContext from '@containers/Stock/StockStore';
import HistoryContext from '@containers/History/HistoryStore';
import OrderContext from '@containers/Order/OrderStore';
import DealOrderContext from '@containers/DealOrder/DealOrderStore';
import StkDepositContext from '@containers/StkDeposit/StkDepositStore';
import StkLimitContext from '@containers/StkLimit/StkLimitStore';
import TradeReportContext from '@containers/TradeReport/TradeReportStore';
import React, { createContext, useContext } from 'react';
export const RootStoreContext = createContext(null);
export const useStore = () => useContext(RootStoreContext);
const RootStore = ({ children }) => {
    const LayoutStore = LayoutContext();
    const LoginStore = LoginContext();
    const UserListStore = UserListContext();
    const AuthStore = AuthContext();
    const AdminStore = AdminContext();
    const BrokerStore = BrokerContext();
    const StockStore = StockContext();
    const HistoryStore = HistoryContext();
    const OrderStore = OrderContext();
    const DealOrderStore = DealOrderContext();
    const StkDepositStore = StkDepositContext();
    const StkLimitStore = StkLimitContext();
    const TradeReportStore = TradeReportContext();
    return (
        <RootStoreContext.Provider
            value={{
                LayoutStore,
                LoginStore,
                UserListStore,
                AuthStore,
                AdminStore,
                BrokerStore,
                StockStore,
                HistoryStore,
                OrderStore,
                DealOrderStore,
                StkDepositStore,
                StkLimitStore,
                TradeReportStore,
            }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};
export default RootStore;
