import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle, holidayFlagText } from '../constant/scheduler';
const EditWorkTimeModal = () => {
    const {
        SchedulerStore: {
            editWorkTimeModalVisible,
            closeEditWorkTimeModal,
            updateData,
            schedulerData,
            setTimeFormat,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={editWorkTimeModalVisible} onClose={closeEditWorkTimeModal} title={'編輯排程'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="workID" className="col-sm-2 col-form-label fs-5">
                        排程代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={schedulerData.workID}
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
                            disabled
                            value={schedulerData.workName}
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
                            disabled
                            value={schedulerData.execCMD}
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
                            value={schedulerData.setTime}
                            id="setTime"
                            onChange={e => {
                                runInAction(() => {
                                    schedulerData.setTime = e.target.value;
                                    updateData('schedulerData', schedulerData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="holidayFlag" className="col-sm-2 col-form-label fs-5">
                        假日是否執行
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={holidayFlagText
                                .filter(item => item.value === schedulerData.holidayFlag)
                                .map(item => item.text)}
                            id="holidayFlag"
                        />
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                updateData('schedulerInfoModalVisible', true);
                                updateData('schedulerAFlag', 'D');
                                closeEditWorkTimeModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnDelete]}
                        >
                            刪除
                        </Button>
                    </li>
                    <li className="ms-auto">
                        <Button
                            onClick={closeEditWorkTimeModal}
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
                                updateData('workTimeInfoModalVisible', true);
                                updateData('schedulerAFlag', 'U');
                                closeEditWorkTimeModal();
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

export default observer(EditWorkTimeModal);
