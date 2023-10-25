/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryTraderList, updateTrader, queryAgentList, getManagerOptions, updateAgent } from '@api';

const initialState = {
    allowTypeOptions: {},
    traderList: [],
    queryTime: '',
    traderData: {
        password: '',
    },
    cTraderName: '',
    cTraderID: '',
    cADID: '',
    userAFlag: '',
    agentAFlag: '',
    agentData: {
        accID: '',
        accName: '',
    },
    dAgentData: {
        accID: '',
        accName: '',
    },
    assignedAgentList: [],
    unassignedAgentList: [],
    editTraderModalVisible: false,
    traderInfoModalVisible: false,
    agentInfoModalVisible: false,
    createTraderModalVisible: false,
    createAgentModalVisible: false,
    applyDisabled: false,
    createAgentDisabled: false,
    applyAgentDisabled: false,
    isLoading: false,
    updateComplete: false,
    loadingFail: false,
    msg: '',
    params: {
        traderID: '',
        allowType: [],
    },
    agentParams: {
        traderID: '',
    },
};

const api = {
    qryTraderList: queryTraderList,
    updateTrader: updateTrader,
    qryAgentList: queryAgentList,
    getOptions: getManagerOptions,
    updateAgent: updateAgent,
};
const TraderListStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        resetTraderData() {
            this.reset({
                cTraderID: '',
                cTraderName: '',
                cADID: '',
                traderData: {},
            });
        },
        resetAgentData() {
            this.reset({
                agentData: {
                    accID: '',
                    accName: '',
                },
            });
        },
        closeEditTraderModal() {
            this.editTraderModalVisible = false;
        },
        closeTraderInfoModal() {
            this.traderInfoModalVisible = false;
        },
        closeCreateTraderModal() {
            this.createTraderModalVisible = false;
        },
        closeCreateAgentModal() {
            this.createAgentModalVisible = false;
        },
        closeAgentInfoModal() {
            this.agentInfoModalVisible = false;
        },
        async getOptionsQuery() {
            runInAction(async () => {
                const authParams = {
                    taskId: '',
                };
                const res = await this.getOptions(authParams);
                const allowTypeOptions = res.item.allowTypeOptions;
                this.assignData({ allowTypeOptions });
            });
        },
        async getQryTraderList() {
            runInAction(async () => {
                await this.getOptionsQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                const allowTypeOptionKeys = Object.keys(this.allowTypeOptions).filter(key =>
                    toJS(passParams).allowType.includes(this.allowTypeOptions[key])
                );
                passParams.allowType = passParams.allowType && allowTypeOptionKeys.join(',');
                const res = await this.qryTraderList(passParams);
                const traderList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ traderList, queryTime });
            });
        },
        async updateTraderData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateTrader(postData);
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
        async getQryAgentList(traderID) {
            runInAction(async () => {
                const res = await this.qryAgentList({ traderID: traderID });
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

export default TraderListStore; // 2
