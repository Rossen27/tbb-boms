import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/traderList';
const AgentInfoModal = () => {
    const {
        TraderListStore: {
            agentInfoModalVisible,
            closeAgentInfoModal,
            updateData,
            resetAgentData,
            traderData,
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
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {agentAFlag === 'D' ? '刪除' : '新增'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約編號
                            </th>
                            <td>{agentAFlag === 'D' ? dAgentData.userID : agentData.userID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約編號名稱
                            </th>
                            <td>{agentAFlag === 'D' ? dAgentData.userName : agentData.userName}</td>
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
                                    agentID: agentData.userID,
                                    userID: traderData.traderID,
                                    actionFlag: agentAFlag,
                                };
                            } else if (agentAFlag === 'D') {
                                postData = {
                                    agentID: dAgentData.userID,
                                    userID: traderData.traderID,
                                    actionFlag: agentAFlag,
                                };
                            }
                            await updateAgentData(postData);
                            closeAgentInfoModal();
                        }}
                        disabled={applyAgentDisabled}
                    >
                        資料確認
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(AgentInfoModal);
