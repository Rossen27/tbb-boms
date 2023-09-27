/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { getRepaymentQuery, callRepaymentUpdate, getRepaymentOptionQuery } from '@api';

const initialState = {
    // applyTypeOptions: {},
    keyOptions: {},
    statusOptions: {},
    repaymentAccountTypeOptions: {},
    repaymentDetailList: [],
    totalNetPayAmount: 0,
    totalRepayMentAmount: 0,
    totalRepayMentInterest: 0,
    queryTime: '',
    editStockModalVisible: false,
    stockInfoModalVisible: false,
    createStockModalVisible: false,
    queryStockModalVisible: false,
    statusDisabled: false,
    payoffModalData: {},
    params: {
        startDate: new Date(),
        endDate: new Date(),
        field: 'bhno',
        keyword: '',
        applyType: [],
        repaymentAccountType: [],
        status: [],
        taskId: '00201',
    },
};

const api = {
    qryRepayment: getRepaymentQuery,
    repaymentUpdate: callRepaymentUpdate,
    qryRepaymentOption: getRepaymentOptionQuery,
};
const StockStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeEditStockModal() {
            this.editStockModalVisible = false;
        },
        closeStockInfoModal() {
            this.stockInfoModalVisible = false;
        },
        closeCreateStockModal() {
            this.createStockModalVisible = false;
        },
        closeQueryStockModal() {
            this.queryStockModalVisible = false;
        },
        async getRepaymentOptionQuery() {
            runInAction(async () => {
                const authParams = {
                    taskId: this.params.taskId,
                };
                const res = await this.qryRepaymentOption(authParams);
                const repaymentOptions = res.item;
                this.assignData({ ...repaymentOptions });
            });
        },
        async getQryRepaymentDetail() {
            runInAction(async () => {
                await this.getRepaymentOptionQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                // const applyTypeOptionKeys = Object.keys(this.applyTypeOptions).filter(key =>
                //     toJS(passParams).applyType.includes(this.applyTypeOptions[key])
                // );
                // passParams.applyType = passParams.applyType && applyTypeOptionKeys.join(',');
                const statusOptionKeys = Object.keys(this.statusOptions).filter(key =>
                    toJS(passParams).status.includes(this.statusOptions[key])
                );
                passParams.status = passParams.status && statusOptionKeys.join(',');
                const repaymentAccountTypeOptionKeys = Object.keys(this.repaymentAccountTypeOptions).filter(key =>
                    toJS(passParams).repaymentAccountType.includes(this.repaymentAccountTypeOptions[key])
                );
                passParams.repaymentAccountType =
                    passParams.repaymentAccountType && repaymentAccountTypeOptionKeys.join(',');
                passParams.startDate = passParams.startDate && new Date(passParams.startDate).toLocaleDateString();
                passParams.endDate = passParams.endDate && new Date(passParams.endDate).toLocaleDateString();
                const res = await this.qryRepayment(passParams);
                const payoffDetails = res.item;
                this.assignData({ ...payoffDetails });
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

export default StockStore; // 2
