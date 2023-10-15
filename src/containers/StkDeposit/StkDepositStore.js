/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryStockDepositList } from '@api';
import { format } from 'date-fns';
const initialState = {
    stkDepositList: [],
    queryTime: '',
    params: {
        startDate: new Date(),
        endDate: new Date(),
    },
};

const api = {
    qryStkDepositList: queryStockDepositList,
};
const StkDepositStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,

        async getQryStkDepositList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && new Date(passParams.startDate).toLocaleDateString();
                passParams.endDate = passParams.endDate && new Date(passParams.endDate).toLocaleDateString();

                const res = await this.qryStkDepositList(passParams);
                const stkDepositList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ stkDepositList, queryTime });
            });
        },
    })); // 3

export default StkDepositStore; // 2
