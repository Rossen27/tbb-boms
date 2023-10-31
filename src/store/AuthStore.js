import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction } from 'mobx';
import { callLoginUser } from '@api';
const initialState = {
    msg: '',
};

const api = {};
const AuthStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...api,
        ...StoreAction(initialState),
        // async login(isAccount, isPwd) {
        //     const postData = {
        //         account: isAccount,
        //         pwd: isPwd,
        //     };
        //     const res = await callLoginUser(postData);
        //     const { token, code, empNo, empName, items } = res.data;
        //     sessionStorage.setItem('loginCode', code);
        //     sessionStorage.setItem('loginEmpNo', empNo);
        //     sessionStorage.setItem('loginEmpName', empName);
        //     sessionStorage.setItem('loginAuth', JSON.stringify(items));
        //     sessionStorage.setItem('token', token);
        // },
        async ldapLogin(isAccount, isPwd) {
            const postData = {
                traderID: isAccount,
                password: isPwd,
            };
            const res = await callLoginUser(postData);
            const { token, code, traderID, traderName, unit } = res.data;
            sessionStorage.setItem('loginCode', code);
            sessionStorage.setItem('loginTraderID', traderID);
            sessionStorage.setItem('loginTraderName', traderName);
            sessionStorage.setItem('loginUnit', unit);
            // sessionStorage.setItem('loginAuth', JSON.stringify(items));
            sessionStorage.setItem('token', token);
            // sessionStorage.setItem('prevDate', prevDate);
            const msg = res.data.message;
            this.assignData({ msg });
        },
        async logout() {
            sessionStorage.clear();
            this.reset();
        },
    })); // 3

export default AuthStore; // 2
