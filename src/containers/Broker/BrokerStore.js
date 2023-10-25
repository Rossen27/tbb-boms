/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryBrokerList, queryBrokerManager, updateBroker, updateAgent } from '@api';

const initialState = {
    brokerList: [],
    queryTime: '',
    brokerData: {},
    managerData: {
        traderID: '',
        traderName: '',
    },
    dManagerData: {
        traderID: '',
        traderName: '',
    },
    brokerAFlag: '',
    managerAFlag: '',
    editBrokerModalVisible: false,
    brokerInfoModalVisible: false,
    managerInfoModalVisible: false,
    createManagerModalVisible: false,
    applyDisabled: false,
    createManagerDisabled: false,
    applyManagerDisabled: false,
    assignedAgentList: [],
    unassignedAgentList: [],
    params: {
        userID: '',
        brkid: '',
    },
    isLoading: false,
    updateComplete: false,
    loadingFail: false,
    msg: '',
};

const api = {
    qryBrokerList: queryBrokerList,
    qryBrokerManager: queryBrokerManager,
    updateBroker: updateBroker,
    updateAgent: updateAgent,
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
        closeBrokerInfoModal() {
            this.brokerInfoModalVisible = false;
        },
        closeCreateManagerModal() {
            this.createManagerModalVisible = false;
        },
        closeManagerInfoModal() {
            this.managerInfoModalVisible = false;
        },
        resetManagerData() {
            this.reset({
                managerData: {
                    userID: '',
                    userName: '',
                },
            });
        },
        async getQryBrokerList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                const res = await this.qryBrokerList(passParams);
                const brokerList = res.items;
                this.updateData('queryTime', res.queryTime);
                this.assignData({ brokerList });
            });
        },
        async updateBrokerData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateBroker(postData);
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
        async getQryManagerList(userID) {
            runInAction(async () => {
                const res = await this.qryBrokerManager({ userID: userID });
                const unassignedAgentList = res.item.unassignedAgentList;
                const assignedAgentList = res.item.assignedAgentList;
                this.assignData({ unassignedAgentList, assignedAgentList });
            });
        },
        async updateAgentData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateAgent(postData);
                const code = parseInt(res.data.code);
                const message = res.data.message;
                if (res) {
                    this.updateData('applyAgentDisabled', false);
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

export default BrokerStore; // 2
