/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryBrokerList, callRepaymentUpdate } from '@api';

const initialState = {
    brokerList: [],
    queryTime: '',
    brokerData: {},
    editBrokerModalVisible: false,
    brokerInfoModalVisible: false,
    statusDisabled: false,
    payoffModalData: {},
    params: {
        userID: '',
        brkID: '',
    },
};

const api = {
    qryBrokerList: queryBrokerList,
    repaymentUpdate: callRepaymentUpdate,
};
const BrokerStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeEditBrokerModal() {
            this.editBrokerModalVisible = false;
        },
        closeEditInfoModal() {
            this.editBrokerInfoModalVisible = false;
        },

        async getQryBrokerList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                const res = await this.qryBrokerList(passParams);
                console.log(res);
                const brokerList = res.items;
                this.updateData('queryTime', res.queryTime);
                this.assignData({ brokerList });
            });
        },
        async updateRepayment() {
            runInAction(async () => {
                const postData = {
                    account: this.payoffModalData.account,
                    bhno: this.payoffModalData.bhno,
                    applicationNumber: this.payoffModalData.applicationNumber,
                    failReason:
                        this.payoffModalData.status === '1'
                            ? this.payoffModalData.repayMentAccountType === 'c'
                                ? '未收款'
                                : '未賣股'
                            : '',
                    repayMentAmount: this.payoffModalData.repayMentAmount,
                    repayMentInterest: this.payoffModalData.repayMentInterest,
                    modifier: localStorage.getItem('loginEmpName'),
                    status: this.payoffModalData.status,
                    taskId: '00201',
                };
                const res = await this.repaymentUpdate(postData);
                const code = parseInt(res.data.code);

                await this.getQryRepaymentDetail();
            });
        },
    })); // 3

export default BrokerStore; // 2
