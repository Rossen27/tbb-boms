/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryUserList, updateUser, queryAgentList, getManagerOptions, updateAgent } from '@api';

const initialState = {
    allowTypeOptions: {},
    userList: [],
    queryTime: '',
    userData: {},
    cUserName: '',
    cUserID: '',
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
    editUserModalVisible: false,
    userInfoModalVisible: false,
    agentInfoModalVisible: false,
    createUserModalVisible: false,
    createAgentModalVisible: false,
    applyDisabled: false,
    createAgentDisabled: false,
    applyAgentDisabled: false,
    isLoading: false,
    updateComplete: false,
    loadingFail: false,
    msg: '',
    params: {
        userID: '',
        allowType: [],
    },
    agentParams: {
        userId: '',
    },
};

const api = {
    qryUserList: queryUserList,
    updateUser: updateUser,
    qryAgentList: queryAgentList,
    getOptions: getManagerOptions,
    updateAgent: updateAgent,
};
const UserListStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        resetUserData() {
            this.reset({
                cUserID: '',
                cUserName: '',
                cADID: '',
                userData: {},
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
        closeEditUserModal() {
            this.editUserModalVisible = false;
        },
        closeUserInfoModal() {
            this.userInfoModalVisible = false;
        },
        closeCreateUserModal() {
            this.createUserModalVisible = false;
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
        async getQryUserList() {
            runInAction(async () => {
                await this.getOptionsQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                const allowTypeOptionKeys = Object.keys(this.allowTypeOptions).filter(key =>
                    toJS(passParams).allowType.includes(this.allowTypeOptions[key])
                );
                passParams.allowType = passParams.allowType && allowTypeOptionKeys.join(',');
                const res = await this.qryUserList(passParams);
                const userList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ userList, queryTime });
            });
        },
        async updateUserData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateUser(postData);
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
        async getQryAgentList(userID) {
            runInAction(async () => {
                const res = await this.qryAgentList({ userID: userID });
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

export default UserListStore; // 2
