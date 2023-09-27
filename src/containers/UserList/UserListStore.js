/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryUserList, updateUser, getRepaymentOptionQuery } from '@api';

const initialState = {
    keyOptions: {},
    statusOptions: {},
    userList: [],
    queryTime: '',
    userData: {},
    cUserName: '',
    cUserID: '',
    cADID: '',
    editUserModalVisible: false,
    userInfoModalVisible: false,
    agentInfoModalVisible: false,
    createUserModalVisible: false,
    createAgentModalVisible: false,
    editAgentModalVisible: false,
    createDisabled: true,
    actions: '',
    payoffModalData: {},
    params: {
        keyword: '',
        status: [],
        taskId: '00201',
    },
};

const api = {
    queryUserList: queryUserList,
    updateUser: updateUser,
    qryRepaymentOption: getRepaymentOptionQuery,
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
        closeEditAgentModal() {
            this.editAgentModalVisible = false;
        },
        closeAgentInfoModal() {
            this.agentInfoModalVisible = false;
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
        async getQryUserList() {
            runInAction(async () => {
                // await this.getRepaymentOptionQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                const statusOptionKeys = Object.keys(this.statusOptions).filter(key =>
                    toJS(passParams).status.includes(this.statusOptions[key])
                );
                passParams.status = passParams.status && statusOptionKeys.join(',');
                const res = await this.queryUserList(passParams);
                const userList = res.items;
                console.log(userList);
                this.assignData({ userList });
            });
        },
        async updateUser() {
            runInAction(async () => {
                const postData = {
                    userID: this.userData.userID,
                    userName: this.userData.userName,
                    adid: this.userData.adid,
                    allowType: this.userData.allowType,
                    pGroup: this.userData.pGroup,
                    actionFlag: this.userData.actionFlag,
                };
                const res = await this.updateUser(postData);
                const code = parseInt(res.data.code);
            });
        },
    })); // 3

export default UserListStore; // 2
