import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction } from 'mobx';
import { callLoginUser, getOptionsQuery } from '@api';
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
        //     localStorage.setItem('loginCode', code);
        //     localStorage.setItem('loginEmpNo', empNo);
        //     localStorage.setItem('loginEmpName', empName);
        //     localStorage.setItem('loginAuth', JSON.stringify(items));
        //     localStorage.setItem('token', token);
        // },
        async ldapLogin(isAccount, isPwd) {
            const postData = {
                adid: isAccount,
                password: isPwd,
            };
            const res = await callLoginUser(postData);
            const { token, code, userId, userName } = res.data;
            localStorage.setItem('loginCode', code);
            localStorage.setItem('loginUserId', userId);
            localStorage.setItem('loginUserName', userName);
            // localStorage.setItem('loginAuth', JSON.stringify(items));
            localStorage.setItem('token', token);
            // localStorage.setItem('prevDate', prevDate);
            const msg = res.data.message;
            this.assignData({ msg });
        },
        async logout() {
            localStorage.clear();
            this.reset();
        },
    })); // 3

export default AuthStore; // 2
