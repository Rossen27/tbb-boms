import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeNonNumeric, addCommas } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stkLimit';
const EditStkLimModal = () => {
    const {
        StkLimitStore: { editStkLimModalVisible, closeEditStkLimModal, updateData, stkLimitData },
    } = useStore();

    return (
        <ModalEdit open={editStkLimModalVisible} onClose={closeEditStkLimModal} title={'編輯交易限額'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="lim_date" className="col-sm-2 col-form-label fs-5">
                        額度日期
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={stkLimitData.lim_date}
                            id="lim_date"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="manager_id" className="col-sm-2 col-form-label fs-5">
                        契約代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={stkLimitData.manager_id}
                            disabled
                            id="manager_id"
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stkLimitData.userName = e.target.value;
                            //         updateData('stkLimitData', stkLimitData);
                            //     });
                            // }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="lim_type" className="col-sm-2 col-form-label fs-5">
                        上市櫃
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="lim_type"
                            value={stkLimitData.lim_type === '1' ? '上市' : '上櫃'}
                            disabled
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stkLimitData.lim_type = e.target.value;
                            //         updateData('stkLimitData', stkLimitData);
                            //     });
                            // }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="lim_val" className="col-sm-2 col-form-label fs-5">
                        操作限額
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="tel"
                            className="form-control w-40 fs-5"
                            value={addCommas(removeNonNumeric(stkLimitData.lim_val || ''))}
                            id="lim_val"
                            onChange={e => {
                                runInAction(() => {
                                    stkLimitData.lim_val = removeNonNumeric(e.target.value);
                                    updateData('stkLimitData', stkLimitData);
                                });
                            }}
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={closeEditStkLimModal}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                            onClick={e => {
                                e.preventDefault();
                                if (parseInt(stkLimitData.lim_val) > 0) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('stkLimInfoModalVisible', true);
                                closeEditStkLimModal();
                            }}
                        >
                            更新資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditStkLimModal);
