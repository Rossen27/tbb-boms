import React from 'react';
import { ModalEdit, CustomDatePicker } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stkLimit';
import { format, parse } from 'date-fns';
const CreateStkLimModal = () => {
    const {
        StkLimitStore: { createStkLimModalVisible, closeCreateStkLimModal, updateData, cStkLimitData, todayDate },
    } = useStore();

    return (
        <ModalEdit open={createStkLimModalVisible} onClose={closeCreateStkLimModal} title={'新增可交割額度'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="lim_date" className="col-sm-2 col-form-label fs-5">
                        額度日期
                    </label>
                    <div className="col-sm-10">
                        {/* <CustomDatePicker
                            date={''}
                            onChange={value => {
                                updateData('todayDate', value);
                            }}
                            start={undefined}
                        /> */}

                        <input
                            type="date"
                            className="form-control w-40 fs-5"
                            value={cStkLimitData.lim_date}
                            id="lim_date"
                            onChange={e => {
                                runInAction(() => {
                                    console.log(e.target.value);
                                    cStkLimitData.lim_date = e.target.value;
                                    updateData('cStkLimitData', cStkLimitData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="manager_id" className="col-sm-2 col-form-label fs-5">
                        交易員代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={cStkLimitData.manager_id}
                            id="manager_id"
                            onChange={e => {
                                runInAction(() => {
                                    cStkLimitData.manager_id = e.target.value;
                                    updateData('stkLimitData', cStkLimitData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="lim_type" className="col-sm-2 col-form-label fs-5">
                        上市櫃
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            type="radio"
                            className="form-check-input fs-5"
                            name="lim_type"
                            value={'1'}
                            checked={cStkLimitData.lim_type === '1'}
                            id="listed"
                            onChange={e => {
                                runInAction(() => {
                                    cStkLimitData.lim_type = e.target.value;
                                    updateData('cStkLimitData', cStkLimitData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="listed">
                            上市
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            type="radio"
                            className="form-check-input fs-5"
                            name="lim_type"
                            value={'2'}
                            checked={cStkLimitData.lim_type === '2'}
                            id="counter"
                            onChange={e => {
                                runInAction(() => {
                                    cStkLimitData.lim_type = e.target.value;
                                    updateData('cStkLimitData', cStkLimitData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="counter">
                            上櫃
                        </label>
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
                            value={cStkLimitData.lim_val}
                            id="lim_val"
                            onChange={e => {
                                runInAction(() => {
                                    cStkLimitData.lim_val = removeNonNumeric(e.target.value);
                                    updateData('cStkLimitData', cStkLimitData);
                                });
                            }}
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={closeCreateStkLimModal}
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
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            onClick={e => {
                                e.preventDefault();
                                if (
                                    removeSpace(cStkLimitData.lim_date) &&
                                    removeSpace(cStkLimitData.manager_id) &&
                                    removeSpace(cStkLimitData.lim_type) &&
                                    removeSpace(cStkLimitData.lim_val) &&
                                    parseInt(cStkLimitData.lim_val) > 0
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                console.log(cStkLimitData);
                                updateData('stkLimInfoModalVisible', true);
                                closeCreateStkLimModal();
                            }}
                        >
                            新增資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateStkLimModal);
