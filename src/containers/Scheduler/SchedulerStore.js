/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { queryWorkList, updateWork, execSync } from '@api';

const initialState = {
    cSchedulerData: {
        workID: '',
        workName: '',
        execCMD: '',
        setTime: '',
        holidayFlag: '',
    },
    workList: [],
    queryTime: '',
    schedulerData: {},
    setTimeFormat: '',
    schedulerAFlag: '',
    editWorkTimeModalVisible: false,
    workTimeInfoModalVisible: false,
    createSchedulerModalVisible: false,
    schedulerInfoModalVisible: false,
    execHandleDisabled: false,
    applyDisabled: false,
    updateComplete: false,
    isLoading: false,
    msg: '',
    loadingFail: false,
};

const api = {
    qryWorkList: queryWorkList,
    updateWork: updateWork,
    execSync: execSync,
};
const SchedulerStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        ...api,
        resetSchedulerData() {
            this.reset({
                cSchedulerData: {
                    workID: '',
                    workName: '',
                    execCMD: '',
                    setTime: '',
                    holidayFlag: '',
                },
            });
        },
        closeEditWorkTimeModal() {
            this.editWorkTimeModalVisible = false;
        },
        closeWorkTimeInfoModal() {
            this.workTimeInfoModalVisible = false;
        },
        closeCreateSchedulerModalVisible() {
            this.createSchedulerModalVisible = false;
        },
        closeSchedulerInfoModal() {
            this.schedulerInfoModalVisible = false;
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
        async handleSchedule(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.execSync(postData);
                const code = parseInt(res.data.code);
                const message = res.data.message;
                if (res) {
                    this.updateData('execHandleDisabled', false);
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
