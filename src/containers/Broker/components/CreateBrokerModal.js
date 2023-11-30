import React from 'react';
import { ModalEdit, SelectMultiple } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/broker';
const CreateBrokerModal = () => {
    const {
        BrokerStore: {
            createBrokerModalVisible,
            closeCreateBrokerModalVisible,
            cBrokerData,
            updateData,
            getQryManagerList,
        },
    } = useStore();

    return (
        <ModalEdit open={createBrokerModalVisible} onClose={closeCreateBrokerModalVisible} title={'新增可下單券商資料'}>
            <form action="">
                <div className="mb-4 row">
                    <label htmlFor="brkid" className="col-sm-2 col-form-label fs-5">
                        券商代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={cBrokerData.brkid}
                            id="brkid"
                            onChange={e => {
                                runInAction(() => {
                                    cBrokerData.brkid = e.target.value;
                                    updateData('cBrokerData', cBrokerData);
                                });
                            }}
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
                            value={cBrokerData.brkName}
                            id="brkName"
                            onChange={e => {
                                runInAction(() => {
                                    cBrokerData.brkName = e.target.value;
                                    updateData('cBrokerData', cBrokerData);
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
                            value={cBrokerData.account}
                            onChange={e => {
                                runInAction(() => {
                                    cBrokerData.account = e.target.value;
                                    updateData('cBrokerData', cBrokerData);
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
                            value={cBrokerData.userID}
                            onChange={e => {
                                runInAction(() => {
                                    cBrokerData.userID = e.target.value;
                                    updateData('cBrokerData', cBrokerData);
                                });
                            }}
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                closeCreateBrokerModalVisible();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li className="ms-3">
                        <Button
                            onClick={e => {
                                runInAction(() => {
                                    e.preventDefault();
                                    if (
                                        removeSpace(cBrokerData.brkid) &&
                                        removeSpace(cBrokerData.brkName) &&
                                        removeSpace(cBrokerData.account) &&
                                        removeSpace(cBrokerData.userID)
                                    ) {
                                        updateData('applyDisabled', false);
                                    } else {
                                        updateData('applyDisabled', true);
                                    }
                                    updateData('brokerInfoModalVisible', true);
                                    closeCreateBrokerModalVisible();
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

export default observer(CreateBrokerModal);
