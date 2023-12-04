/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryStockLimitList, updateStockLimit } from '@api';
import { format } from 'date-fns';
const initialState = {
    stkLimitList: [],
    stkLimitData: {},
    todayDate: '',
    cStkLimitData: {
        lim_date: '',
        manager_id: '',
        lim_type: '',
        lim_val: '',
    },
    queryTime: '',
    stkLimAFlag: '',
    params: {
        startDate: new Date(),
        endDate: new Date(),
    },
    createStkLimModalVisible: false,
    editStkLimModalVisible: false,
    stkLimInfoModalVisible: false,
    applyDisabled: false,
    isLoading: false,
    updateComplete: false,
    loadingFail: false,
    msg: '',
};

const api = {
    qryStkLimList: queryStockLimitList,
    updateStkLim: updateStockLimit,
};
const StkLimitStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeCreateStkLimModal() {
            this.createStkLimModalVisible = false;
        },
        closeEditStkLimModal() {
            this.editStkLimModalVisible = false;
        },
        closeStkLimInfoModal() {
            this.stkLimInfoModalVisible = false;
        },
        async getQryStkLimList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && format(new Date(passParams.startDate), 'yyyyMMdd');
                passParams.endDate = passParams.endDate && format(new Date(passParams.endDate), 'yyyyMMdd');

                const res = await this.qryStkLimList(passParams);
                const stkLimitList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ stkLimitList, queryTime });
            });
        },
        async updateStkLimData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateStkLim(postData);
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

export default StkLimitStore; // 2
