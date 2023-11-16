/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryWorkList, updateWork } from '@api';

const initialState = {
    allowTypeOptions: {},
    workList: [],
    queryTime: '',
    schedulerData: {},
    setTimeFormat: '',
    editWorkTimeModalVisible: false,
    workTimeInfoModalVisible: false,

    applyDisabled: false,
    updateComplete: false,
    isLoading: false,
    msg: '',
    loadingFail: false,
};

const api = {
    qryWorkList: queryWorkList,
    updateWork: updateWork,
};
const SchedulerStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        closeEditWorkTimeModal() {
            this.editWorkTimeModalVisible = false;
        },
        closeWorkTimeInfoModal() {
            this.workTimeInfoModalVisible = false;
        },
        async getQryWorkList() {
            runInAction(async () => {
                const res = await this.qryWorkList();
                const workList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ workList, queryTime });
            });
        },
        async updateSchedule(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateWork(postData);
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

export default SchedulerStore; // 2
