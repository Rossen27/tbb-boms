import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/broker';
const EditBrokerModal = () => {
    const {
        BrokerStore: { editBrokerModalVisible, closeEditBrokerModal, brokerData, updateData, getQryManagerList },
    } = useStore();

    return (
        <ModalEdit open={editBrokerModalVisible} onClose={closeEditBrokerModal} title={'編輯可下單券商資料'}>
            <form action="">
                <div className="mb-4 row">
                    <label htmlFor="brkid" className="col-sm-2 col-form-label fs-5">
                        券商代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={brokerData.brkid}
                            id="brkid"
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="brkName" className="col-sm-2 col-form-label fs-5">
                        券商名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={brokerData.brkName}
                            id="brkName"
                            onChange={e => {
                                runInAction(() => {
                                    brokerData.brkName = e.target.value;
                                    updateData('brokerData', brokerData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="account" className="col-sm-2 col-form-label fs-5">
                        券商帳號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="account"
                            value={brokerData.account}
                            onChange={e => {
                                runInAction(() => {
                                    brokerData.account = e.target.value;
                                    updateData('brokerData', brokerData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userID" className="col-sm-2 col-form-label fs-5">
                        契約編號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="userID"
                            value={brokerData.userID}
                            disabled
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    {/* <li>
                        <Button
                            onClick={() => {
                                closeEditBrokerModal();
                                getQryManagerList(brokerData.userID);
                                updateData('createManagerModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                        >
                            經理人設定
                        </Button>
                    </li> */}
                    <li>
                        {/* <li className="ms-auto"> */}
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                closeEditBrokerModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li>
                        {/* <li className="ms-3"> */}
                        <Button
                            onClick={e => {
                                runInAction(() => {
                                    e.preventDefault();
                                    if (removeSpace(brokerData.brkName) && removeSpace(brokerData.account)) {
                                        updateData('applyDisabled', false);
                                    } else {
                                        updateData('applyDisabled', true);
                                    }
                                    updateData('brokerInfoModalVisible', true);
                                    closeEditBrokerModal();
                                });
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                        >
                            更新資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditBrokerModal);
