/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryAdminList, updateAdmin } from '@api';

const initialState = {
    allowTypeOptions: {},
    adminList: [],
    queryTime: '',
    adminData: {},
    cTraderName: '',
    cTraderID: '',
    cADID: '',
    editAdminModalVisible: false,
    adminInfoModalVisible: false,
    createAdminModalVisible: false,
    adminAFlag: '',
    applyDisabled: false,
    params: {
        traderID: '',
        allowType: [],
    },
};

const api = {
    qryAdminList: queryAdminList,
    updateAdmin: updateAdmin,
};
const AdminStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeEditAdminModal() {
            this.editAdminModalVisible = false;
        },
        closeAdminInfoModal() {
            this.adminInfoModalVisible = false;
        },
        closeCreateAdminModal() {
            this.createAdminModalVisible = false;
        },
        resetAdminData() {
            this.reset({
                cTraderID: '',
                cTraderName: '',
                cADID: '',
                adminData: {},
            });
        },
        async getQryAdminList() {
            runInAction(async () => {
                const passParams = JSON.parse(JSON.stringify(this.params));
                const res = await this.qryAdminList(passParams);
                const adminList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ adminList, queryTime });
            });
        },
        async updateAdminData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateAdmin(postData);
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
    })); // 3

export default AdminStore; // 2
