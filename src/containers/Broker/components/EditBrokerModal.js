import React from 'react';
import { ModalEdit, SelectMultiple } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/broker';
const EditBrokerModal = () => {
    const {
        BrokerStore: {
            editBrokerModalVisible,
            closeEditBrokerModal,
            updateData,
            payoffModalData,
            updateRepayment,
            statusDisabled,
            statusOptions,
            params,
            paramsUpdate,
        },
    } = useStore();

    const { keyword, startDate, repaymentAccountType, status, applyType, endDate, field } = params;
    return (
        <ModalEdit open={editBrokerModalVisible} onClose={closeEditBrokerModal} title={'編輯可下單券商資料'}>
            <form action="">
                <div className="mb-4 row">
                    <label htmlFor="userAccount" className="col-sm-2 col-form-label fs-5">
                        券商代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={payoffModalData.account}
                            id="userAccount"
                            onChange={e => {
                                runInAction(e => {
                                    console.log(e.target.value);
                                    updateData('payoffModalData', e.target.value);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userName" className="col-sm-2 col-form-label fs-5">
                        券商名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={payoffModalData.name}
                            id="userName"
                            onChange={e => {
                                runInAction(e => {
                                    console.log(e.target.value);
                                    updateData('payoffModalData', e.target.value);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="payoffAmount" className="col-sm-2 col-form-label fs-5">
                        券商帳號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="payoffAmount"
                            value={payoffModalData.repayMentAmount ? addCommas(payoffModalData.repayMentAmount) : 0}
                            onChange={e => {
                                runInAction(e => {
                                    console.log(e.target.value);
                                    updateData('payoffModalData', e.target.value);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="payoffFee" className="col-sm-2  fs-5">
                        經理人
                    </label>
                    <div className="col-sm-10">
                        <SelectMultiple
                            title={'經理人名單'}
                            options={statusOptions}
                            onChange={value => paramsUpdate('repaymentAccountType', value)}
                            selectArr={repaymentAccountType}
                        />
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
                    {/* <li>
                        <Button
                            onClick={() => {
                                closeEditBrokerModal();
                                updateData('createUserModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                            className=""
                        >
                            取消
                        </Button>
                    </li> */}
                    <li className="me-5">
                        <Button
                            onClick={() => {
                                updateData('editBrokerModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnDelete]}
                        >
                            刪除
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={e => {
                                console.log(e.target.value);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                        >
                            編輯
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditBrokerModal);
