import LayoutContext from './LayoutStore';
import LoginContext from '@containers/Login/LoginStore';
import UserListContext from '@containers/UserList/UserListStore';
import AuthContext from './AuthStore';
import AdminContext from '@containers/Admin/AdminStore';
import BrokerContext from '@containers/Broker/BrokerStore';
import StockContext from '@containers/Stock/StockStore';
import HistoryContext from '@containers/History/HistoryStore';
import OrderContext from '@containers/Order/OrderStore';
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
            }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};
export default RootStore;
