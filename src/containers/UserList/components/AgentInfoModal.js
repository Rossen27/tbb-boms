import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/userList';
const AgentInfoModal = () => {
    const {
        UserListStore: {
            agentInfoModalVisible,
            closeAgentInfoModal,
            updateData,
            resetAgentData,
            userData,
            agentAFlag,
            agentData,
            dAgentData,
            updateAgentData,
            applyAgentDisabled,
        },
    } = useStore();

    return (
        <ModalEdit
            open={agentInfoModalVisible}
            onClose={() => {
                closeAgentInfoModal();
                resetAgentData();
            }}
            title={'確認代理人資料'}
        >
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-４">
                                {agentAFlag === 'D' ? '刪除' : '新增'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                代號
                            </th>
                            <td>{agentAFlag === 'D' ? dAgentData.accID : agentData.accID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                名稱
                            </th>
                            <td>{agentAFlag === 'D' ? dAgentData.accName : agentData.accName}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            closeAgentInfoModal();
                            updateData('createAgentModalVisible', true);
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        sx={[btnStyle.btn, btnStyle.btnCreate]}
                        onClick={async e => {
                            e.preventDefault();
                            updateData('applyAgentDisabled', true);
                            let postData = {};
                            if (agentAFlag === 'C') {
                                postData = {
                                    accID: agentData.accID,
                                    userID: userData.userID,
                                    actionFlag: agentAFlag,
                                };
                            } else if (agentAFlag === 'D') {
                                postData = {
                                    accID: dAgentData.accID,
                                    userID: userData.userID,
                                    actionFlag: agentAFlag,
                                };
                            }
                            await updateAgentData(postData);
                            closeAgentInfoModal();
                        }}
                        disabled={applyAgentDisabled}
                    >
                        確認變更
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(AgentInfoModal);
