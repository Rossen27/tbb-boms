import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle, holidayFlagText } from '../constant/scheduler';
const CreateSchedulerModal = () => {
    const {
        SchedulerStore: {
            createSchedulerModalVisible,
            closeCreateSchedulerModalVisible,
            updateData,
            cSchedulerData,
            setTimeFormat,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={createSchedulerModalVisible} onClose={closeCreateSchedulerModalVisible} title={'新增排程'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="workID" className="col-sm-2 col-form-label fs-5">
                        排程代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={cSchedulerData.workID}
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.workID = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                            id="workID"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="workName" className="col-sm-2 col-form-label fs-5">
                        排程名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={cSchedulerData.workName}
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.workName = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                            id="workName"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="execCMD" className="col-sm-2 col-form-label fs-5">
                        執行指令
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={cSchedulerData.execCMD}
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.execCMD = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                            id="execCMD"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="setTime" className="col-sm-2 col-form-label fs-5">
                        作業時間
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="time"
                            step="1"
                            className="form-control w-40 fs-5"
                            value={cSchedulerData.setTime}
                            id="setTime"
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.setTime = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center border-bottom pb-5">
                    <label htmlFor="holidayFlag" className="col-sm-3 col-form-label fs-5">
                        假日是否執行
                    </label>
                    <div className="form-check form-check-inline col-sm-1 me-0 mb-0">
                        <input
                            type="radio"
                            name="holidayFlag"
                            className="form-check-input fs-5"
                            value={'N'}
                            checked={cSchedulerData.holidayFlag === 'N'}
                            id="no"
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.holidayFlag = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="no">
                            否
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-1 me-0 mb-0">
                        <input
                            type="radio"
                            name="holidayFlag"
                            className="form-check-input fs-5"
                            value={'Y'}
                            checked={cSchedulerData.holidayFlag === 'Y'}
                            id="yes"
                            onChange={e => {
                                runInAction(() => {
                                    cSchedulerData.holidayFlag = e.target.value;
                                    updateData('cSchedulerData', cSchedulerData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="yes">
                            是
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-center m-5">
                    <li>
                        <Button
                            onClick={closeCreateSchedulerModalVisible}
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
                                if (
                                    removeSpace(cSchedulerData.workID) &&
                                    removeSpace(cSchedulerData.workName) &&
                                    removeSpace(cSchedulerData.execCMD) &&
                                    cSchedulerData.setTime &&
                                    cSchedulerData.holidayFlag
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('schedulerInfoModalVisible', true);
                                closeCreateSchedulerModalVisible();
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

export default observer(CreateSchedulerModal);
