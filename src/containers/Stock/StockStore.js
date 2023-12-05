/* eslint-disable object-shorthand */
import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { runInAction, toJS } from 'mobx';
import { getStockAllowOptions, queryStockAllowList, updateStockAllow, getSyncStkAllow } from '@api';
import XMLParser from 'react-xml-parser';

const initialState = {
    pGroupOptions: {},
    stockAllowList: [],
    queryTime: '',
    stockAllowData: {},
    dStockAllowData: {},
    stockAllowAFlag: '',
    editStockModalVisible: false,
    stockInfoModalVisible: false,
    createStockModalVisible: false,
    queryStockModalVisible: false,
    cStockNO: '',
    // cStockName: '',
    params: {
        stockNo: '',
        kind: [],
    },
};

const api = {
    qryStockAllowList: queryStockAllowList,
    getOptions: getStockAllowOptions,
    updateStockAllow: updateStockAllow,
    getSyncStkAllow: getSyncStkAllow,
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
        resetStockAllowData() {
            this.reset({
                cStockNO: '',
                // cStockName: '',
                stockAllowData: {},
            });
        },
        async getOptionsQuery() {
            runInAction(async () => {
                const authParams = {
                    taskId: '',
                };
                const res = await this.getOptions(authParams);
                const pGroupOptions = res.item.pGroupOptions;
                this.assignData({ pGroupOptions });
            });
        },
        async getQryStockAllowList() {
            runInAction(async () => {
                await this.getOptionsQuery();
                const passParams = JSON.parse(JSON.stringify(this.params));
                const pGroupOptionKeys = Object.keys(this.pGroupOptions).filter(key =>
                    toJS(passParams).kind.includes(this.pGroupOptions[key])
                );
                passParams.kind = passParams.kind && pGroupOptionKeys.join(',');
                const res = await this.qryStockAllowList(passParams);
                const stockAllowList = res.items;
                const queryTime = res.queryTime;
                this.assignData({ stockAllowList, queryTime });
            });
        },
        async updateStockAllowData(postData) {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.updateStockAllow(postData);
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
        async getSyncStkAllowData() {
            runInAction(async () => {
                this.updateData('isLoading', true);
                const res = await this.getSyncStkAllow();
                const syncData = res;
                const parsedXML = new XMLParser().parseFromString(syncData);
                const retElement = parsedXML.getElementsByTagName('ret')[0];
                if (!retElement) {
                    throw new Error('Invalid XML structure - <ret> element not found');
                }
                const retCodeValue = retElement.attributes.retcode;
                if (retCodeValue) {
                    this.updateData('updateComplete', true);
                    this.updateData('isLoading', false);
                    if (retCodeValue !== '000000') {
                        this.updateData('loadingFail', true);
                    }
                }
            });
        },
    })); // 3

export default StockStore; // 2
