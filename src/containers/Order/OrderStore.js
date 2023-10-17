/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryOrderTransactionList } from '@api';
import { format } from 'date-fns';
const initialState = {
    orderTransList: [],
    queryTime: '',
    params: {
        startDate: new Date(),
        endDate: new Date(),
        functionId: [],
    },
};

const api = {
    qryOrderTransList: queryOrderTransactionList,
};
const OrderStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,

        async getQryOrderTransList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && format(new Date(passParams.startDate), 'yyyyMMdd');
                passParams.endDate = passParams.endDate && format(new Date(passParams.endDate), 'yyyyMMdd');

                const res = await this.qryOrderTransList(passParams);
                const orderTransList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ orderTransList, queryTime });
            });
        },
    })); // 3

export default OrderStore; // 2
