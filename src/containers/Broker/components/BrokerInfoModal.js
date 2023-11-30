import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/broker';

const BrokerInfoModal = () => {
    const {
        BrokerStore: {
            brokerInfoModalVisible,
            closeBrokerInfoModal,
            updateData,
            brokerAFlag,
            brokerData,
            cBrokerData,
            updateBrokerData,
            applyDisabled,
        },
    } = useStore();
    return (
        <ModalEdit open={brokerInfoModalVisible} onClose={closeBrokerInfoModal} title={'確認券商資料'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {brokerAFlag === 'C' ? '新增' : '更新'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商代號
                            </th>
                            <td>{brokerAFlag === 'C' ? cBrokerData.brkid : brokerData.brkid}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商名稱
                            </th>
                            <td>{brokerAFlag === 'C' ? cBrokerData.brkName : brokerData.brkName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商帳號
                            </th>
                            <td>{brokerAFlag === 'C' ? cBrokerData.account : brokerData.account}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約編號
                            </th>
                            <td>{brokerAFlag === 'C' ? cBrokerData.userID : brokerData.userID}</td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                if (brokerAFlag === 'C') {
                                    updateData('createBrokerModalVisible', true);
                                } else if (brokerAFlag === 'U') {
                                    updateData('editBrokerModalVisible', true);
                                }
                                closeBrokerInfoModal();
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
                                if (brokerAFlag === 'C') {
                                    postData = {
                                        brkid: cBrokerData.brkid,
                                        brkName: cBrokerData.brkName,
                                        userID: cBrokerData.userID,
                                        account: cBrokerData.account,
                                        actionFlag: brokerAFlag,
                                    };
                                } else if (brokerAFlag === 'U') {
                                    postData = {
                                        brkid: brokerData.brkid,
                                        brkName: brokerData.brkName,
                                        userID: brokerData.userID,
                                        account: brokerData.account,
                                        actionFlag: brokerAFlag,
                                    };
                                }
                                await updateBrokerData(postData);
                                closeBrokerInfoModal();
                            }}
                            disabled={applyDisabled}
                        >
                            資料確認
                        </Button>
                        <p className={`${applyDisabled ? 'fs-5 text-danger text-center' : 'd-none'}`}>請確實填寫欄位</p>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(BrokerInfoModal);
