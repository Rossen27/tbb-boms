/** 共用的 store action */
import { runInAction } from 'mobx';
const StoreAction = initialState => {
    const originState = initialState;
    return {
        updateData(dataKey, value) {
            runInAction(() => {
                this[dataKey] = value;
            });
        },
        /** action - 多項改變  */

        assignData(obj) {
            Object.assign(this, obj);
        },
        /** action - params 單項改變 */

        paramsUpdate(dataKey, value) {
            const params = { ...this.params, [dataKey]: value };
            runInAction(() => {
                this.params = params;
            });
        },
        paramsAssign(obj) {
            const params = { ...this.params, ...obj };
            runInAction(() => {
                this.params = params;
            });
        },
        reset(resetState = originState) {
            Object.assign(this, resetState);
        },
        async getList() {
            const res = await this.api.list(this.params);
            runInAction(() => {
                this.list = res.data.list;
            });
        },
        async openModal() {
            runInAction(() => {
                this.visible = true;
            });
        },
        async closeModal() {
            runInAction(() => {
                this.reset();
            });
        },
    };
};

export default StoreAction;
