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
                            <th className="title fw-bolder mb-4 text-danger text-end fs-４">更新資料，請確認：</th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商代號
                            </th>
                            <td>{brokerData.brkid}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商名稱
                            </th>
                            <td>{brokerData.brkName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商帳號
                            </th>
                            <td>{brokerData.account}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人代號
                            </th>
                            <td>{brokerData.userID}</td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                updateData('editBrokerModalVisible', true);
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
                                const postData = {
                                    accID: brokerData.accID,
                                    brkid: brokerData.brkid,
                                    brkName: brokerData.brkName,
                                    userID: brokerData.userID,
                                    account: brokerData.account,
                                    actionFlag: brokerAFlag,
                                };
                                console.log(postData);
                                await updateBrokerData(postData);
                                closeBrokerInfoModal();
                                // resetData();
                            }}
                            disabled={applyDisabled}
                        >
                            確認變更
                        </Button>
                        <p className={`${applyDisabled ? 'fs-5 text-danger text-center' : 'd-none'}`}>請確實填寫欄位</p>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(BrokerInfoModal);
