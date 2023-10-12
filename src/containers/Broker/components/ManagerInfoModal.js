import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/broker';

const ManagerInfoModal = () => {
    const {
        BrokerStore: {
            managerInfoModalVisible,
            closeManagerInfoModal,
            updateData,
            resetManagerData,
            brokerData,
            managerData,
            dManagerData,
            managerAFlag,
            updateAgentData,
            applyManagerDisabled,
        },
    } = useStore();

    return (
        <ModalEdit
            open={managerInfoModalVisible}
            onClose={() => {
                closeManagerInfoModal();
                resetManagerData();
            }}
            title={'確認經理人資料'}
        >
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-４">
                                {managerAFlag === 'D' ? '刪除' : '新增'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人代號
                            </th>
                            <td>{managerAFlag === 'D' ? dManagerData.userID : managerData.userID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人名稱
                            </th>
                            <td>{managerAFlag === 'D' ? dManagerData.userName : managerData.userName}</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={() => {
                                closeManagerInfoModal();
                                updateData('createManagerModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            上一步
                        </Button>
                    </li>
                    <li className="ms-3">
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            onClick={async e => {
                                e.preventDefault();
                                updateData('applyManagerDisabled', true);
                                let postData = {};
                                if (managerAFlag === 'C') {
                                    postData = {
                                        accID: brokerData.accID,
                                        userID: managerData.userID,
                                        actionFlag: managerAFlag,
                                    };
                                } else if (managerAFlag === 'D') {
                                    postData = {
                                        accID: brokerData.accID,
                                        userID: dManagerData.userID,
                                        actionFlag: managerAFlag,
                                    };
                                }
                                await updateAgentData(postData);
                                closeManagerInfoModal();
                            }}
                            disabled={applyManagerDisabled}
                        >
                            資料確認
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(ManagerInfoModal);
