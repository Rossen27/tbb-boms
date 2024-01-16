import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction } from 'mobx';
import { getTraderInfo, updateUserPassword, getIdleTime } from '@api';

const initialState = {
    traderID: '',
    traderName: '',
    editAccModalVisible: false,
    newPsd: '',
};

const LoginStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        closeEditAccModal() {
            this.editAccModalVisible = false;
        },
        async traderInfo() {
            runInAction(async () => {
                const res = await getTraderInfo();
                const traderID = res.item.traderID;
                const traderName = res.item.traderName;
                this.assignData({ traderID, traderName });
            });
        },
        async updateUserPsd(postData) {
            let rtnCode;
            await runInAction(async () => {
                const res = await updateUserPassword(postData);
                const code = parseInt(res.data.code);
                const message = res.data.message;
                if (code) {
                    alert(message);
                } else {
                    alert('密碼重設成功，請重新登入');
                    rtnCode = 1;
                }
                this.updateData('applyDisabled', false);
            });
            return rtnCode;
        },
        async getIdleTime() {
            let idleTime;
            runInAction(async () => {
                const res = await getIdleTime();
                idleTime = res.idleTime;
                sessionStorage.setItem('idleTime', idleTime);
                this.assignData({ idleTime });
            });
            return idleTime;
        },
    }));

export default LoginStore;
