import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/broker';

const BrokerInfoModal = () => {
    const {
        BrokerStore: { brokerInfoModalVisible, closeBrokerInfoModal, updateData, actions },
    } = useStore();

    const [isClicked, setIsClicked] = useState(true);
    return (
        <ModalEdit open={brokerInfoModalVisible} onClose={closeBrokerInfoModal} title={'確認券商資料'}>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    closeBrokerInfoModal();
                    if (isClicked) {
                        setIsClicked(false);
                        // updateRepayment();
                        setTimeout(() => {
                            setIsClicked(true);
                        }, 3000);
                    }
                }}
            >
                <h4 className="title fw-bolder text-center lh-base mb-4">
                    {/* {
                    if(actions ==='Delete'){
                        return '刪除'
                    }else if(actions ==='Update'){
                        return '編輯'
                    }
                } */}
                </h4>

                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            closeBrokerInfoModal();
                            if (actions === 'Delete') {
                                updateData('createAdminModalVisible', true);
                            } else if (actions === 'Update') {
                                updateData('editAdminModalVisible', true);
                            }
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button type="submit" variant="contained" sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}>
                        確認變更
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(BrokerInfoModal);
