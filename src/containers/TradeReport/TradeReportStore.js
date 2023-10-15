/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryTradeReportList } from '@api';
import { format } from 'date-fns';
const initialState = {
    tradeReportList: [],
    queryTime: '',
    params: {
        startDate: new Date(),
        endDate: new Date(),
    },
};

const api = {
    qryTradeReportList: queryTradeReportList,
};
const TradeReportStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,

        async getQryTradeReportList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                passParams.startDate = passParams.startDate && format(new Date(passParams.startDate), 'yyyyMMdd');
                passParams.endDate = passParams.endDate && format(new Date(passParams.endDate), 'yyyyMMdd');

                const res = await this.qryTradeReportList(passParams);
                const tradeReportList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ tradeReportList, queryTime });
            });
        },
    })); // 3

export default TradeReportStore; // 2
