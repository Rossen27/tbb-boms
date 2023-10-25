import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction } from 'mobx';
import { getTraderInfo, updateUserPassword } from '@api';

const initialState = {
    adid: '',
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
                const adid = res.item.adid;
                const traderName = res.item.traderName;
                this.assignData({ adid, traderName });
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
    }));

export default LoginStore;
