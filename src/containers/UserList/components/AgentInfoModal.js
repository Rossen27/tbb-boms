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
            payoffModalData,
            updateRepayment,
            actions,
        },
    } = useStore();
    const [isClicked, setIsClicked] = useState(true);
    return (
        <ModalEdit open={agentInfoModalVisible} onClose={closeAgentInfoModal} title={'確認代理人資料變更'}>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    closeAgentInfoModal();
                    if (isClicked) {
                        setIsClicked(false);
                        updateRepayment();
                        setTimeout(() => {
                            setIsClicked(true);
                        }, 3000);
                    }
                }}
            >
                {/* {payoffModalData.status
                    ? statusText[payoffModalData.status].text.split('\n').map((line, idx) => {
                          return (
                              <h4 className="title fw-bolder text-center lh-base mb-4" key={`line ${idx}`}>
                                  {line}
                              </h4>
                          );
                      })
                    : ''} */}
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            closeAgentInfoModal();
                            if (actions === 'Create') {
                                updateData('createAgentModalVisible', true);
                            } else if (actions === 'Update') {
                                updateData('editAgentModalVisible', true);
                            }
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button type="submit" variant="contained" sx={[btnStyle.btn, btnStyle.btnCreate]}>
                        確認變更
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(AgentInfoModal);
