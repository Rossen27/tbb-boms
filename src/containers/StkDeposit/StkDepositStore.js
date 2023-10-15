/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryStockDepositList, updateStockDeposit } from '@api';
import { format } from 'date-fns';
const initialState = {
    stkDepositList: [],
    stkDepositData: {},
    stkDepositAFlag: '',
    queryTime: '',
    params: {
        startDate: new Date(),
        endDate: new Date(),
    },
    editStkDepositModalVisible: false,
    stkDepositInfoModalVisible: false,
    applyDisabled: false,
    isLoading: false,
    updateComplete: false,
    loadingFail: false,
    msg: '',
};

const api = {
    qryStkDepositList: queryStockDepositList,
    updateStkDeposit: updateStockDeposit,
};
const StkDepositStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeEditStkDepositModal() {
            this.editStkDepositModalVisible = false;
        },
        closeStkDepositInfoModal() {
            this.stkDepositInfoModalVisible = false;
        },
        async getQryStkDepositList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && format(new Date(passParams.startDate), 'yyyyMMdd');
                passParams.endDate = passParams.endDate && format(new Date(passParams.endDate), 'yyyyMMdd');

                const res = await this.qryStkDepositList(passParams);
                const stkDepositList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ stkDepositList, queryTime });
            });
        },
        async updateStkDepositData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateStkDeposit(postData);
                const code = parseInt(res.data.code);
                const message = res.data.message;
                if (res) {
                    this.updateData('applyDisabled', false);
                    this.updateData('updateComplete', true);
                    this.updateData('isLoading', false);
                    if (code) {
                        this.updateData('loadingFail', true);
                        this.updateData('msg', message);
                    }
                }
            });
        },
    })); // 3

export default StkDepositStore; // 2
