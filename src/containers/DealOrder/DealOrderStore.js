/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryTradeTransactionList, getManagerOptions } from '@api';
import { format } from 'date-fns';
const initialState = {
    DealOrderList: [],
    queryTime: '',
    params: {
        startDate: new Date().setHours(0, 0, 0, 0),
        endDate: new Date(),
    },
};

const api = {
    getOptions: getManagerOptions,
    qryTradeTransactionList: queryTradeTransactionList,
};
const DealOrderStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        async getOptionsQuery() {
            runInAction(async () => {
                const authParams = {
                    taskId: '',
                };
                const res = await this.getOptions(authParams);
                const functionOptions = res.item.functionOptions;
                this.assignData({ functionOptions });
            });
        },
        async getQryDealOrderList() {
            runInAction(async () => {
                // await this.getOptionsQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && new Date(passParams.startDate).toLocaleDateString();
                passParams.endDate = passParams.endDate && new Date(passParams.endDate).toLocaleDateString();

                const res = await this.qryTradeTransactionList(passParams);
                const DealOrderList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ DealOrderList, queryTime });
            });
        },
    })); // 3

export default DealOrderStore; // 2
