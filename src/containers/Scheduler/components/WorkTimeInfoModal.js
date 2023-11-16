import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle, holidayFlagText } from '../constant/scheduler';

const WorkTimeInfoModal = () => {
    const {
        SchedulerStore: {
            workTimeInfoModalVisible,
            closeWorkTimeInfoModal,
            updateData,
            setTimeFormat,
            schedulerData,
            applyDisabled,
            updateSchedule,
        },
    } = useStore();
    const setTimeParse = setTimeFormat.replaceAll(':', '');

    return (
        <ModalEdit open={workTimeInfoModalVisible} onClose={closeWorkTimeInfoModal} title={'確認排程作業時間'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">更新資料，請確認：</th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                排程代號
                            </th>
                            <td>{schedulerData.workID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                排程名稱
                            </th>
                            <td>{schedulerData.workName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                執行指令
                            </th>
                            <td>{schedulerData.execCMD}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                作業時間
                            </th>
                            <td>{setTimeFormat}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                假日是否執行
                            </th>
                            <td>
                                {holidayFlagText
                                    .filter(item => item.value === schedulerData.holidayFlag)
                                    .map(item => item.text)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                updateData('editWorkTimeModalVisible', true);
                                closeWorkTimeInfoModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                        >
                            上一步
                        </Button>
                    </li>
                    <li className="ms-3">
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                            onClick={async e => {
                                e.preventDefault();
                                updateData('applyDisabled', true);
                                const postData = {
                                    workID: schedulerData.workID,
                                    workName: schedulerData.workName,
                                    execCMD: schedulerData.execCMD,
                                    setTime: setTimeParse,
                                    holidayFlag: schedulerData.holidayFlag,
                                    actionFlag: 'U',
                                };
                                await updateSchedule(postData);
                                closeWorkTimeInfoModal();
                            }}
                            disabled={applyDisabled}
                        >
                            資料確認
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(WorkTimeInfoModal);
