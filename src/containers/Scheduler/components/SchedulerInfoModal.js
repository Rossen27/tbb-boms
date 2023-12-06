import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle, holidayFlagText } from '../constant/scheduler';

const SchedulerInfoModal = () => {
    const {
        SchedulerStore: {
            schedulerInfoModalVisible,
            closeSchedulerInfoModal,
            updateData,
            schedulerData,
            cSchedulerData,
            applyDisabled,
            updateSchedule,
            schedulerAFlag,
        },
    } = useStore();

    let hFT = '';
    if (schedulerAFlag === 'C') {
        hFT = holidayFlagText.filter(item => item.value === cSchedulerData.holidayFlag).map(item => item.text);
    } else if (schedulerAFlag === 'D') {
        hFT = holidayFlagText.filter(item => item.value === schedulerData.holidayFlag).map(item => item.text);
    }
    return (
        <ModalEdit open={schedulerInfoModalVisible} onClose={closeSchedulerInfoModal} title={'排程設定'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {schedulerAFlag === 'C' ? '新增' : '刪除'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                排程代號
                            </th>
                            <td>{schedulerAFlag === 'C' ? cSchedulerData.workID : schedulerData.workID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                排程名稱
                            </th>
                            <td>{schedulerAFlag === 'C' ? cSchedulerData.workName : schedulerData.workName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                執行指令
                            </th>
                            <td>{schedulerAFlag === 'C' ? cSchedulerData.execCMD : schedulerData.execCMD}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                作業時間
                            </th>
                            <td>{schedulerAFlag === 'C' ? cSchedulerData.setTime : schedulerData.setTime}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                假日是否執行
                            </th>
                            <td>{hFT}</td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                if (schedulerAFlag === 'D') {
                                    updateData('editWorkTimeModalVisible', true);
                                } else if (schedulerAFlag === 'C') {
                                    updateData('createSchedulerModalVisible', true);
                                }
                                closeSchedulerInfoModal();
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
                                let postData = {};
                                if (schedulerAFlag === 'C') {
                                    postData = {
                                        workID: cSchedulerData.workID,
                                        workName: cSchedulerData.workName,
                                        execCMD: cSchedulerData.execCMD,
                                        setTime: cSchedulerData.setTime.replaceAll(':', ''),
                                        holidayFlag: cSchedulerData.holidayFlag,
                                        actionFlag: schedulerAFlag,
                                    };
                                } else if (schedulerAFlag === 'D') {
                                    postData = {
                                        workID: schedulerData.workID,
                                        workName: schedulerData.workName,
                                        execCMD: schedulerData.execCMD,
                                        setTime: schedulerData.setTime.replaceAll(':', ''),
                                        holidayFlag: schedulerData.holidayFlag,
                                        actionFlag: schedulerAFlag,
                                    };
                                }
                                await updateSchedule(postData);
                                closeSchedulerInfoModal();
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

export default observer(SchedulerInfoModal);
