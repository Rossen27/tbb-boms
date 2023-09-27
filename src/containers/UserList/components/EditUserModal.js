import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const EditUserModal = () => {
    const {
        UserListStore: {
            editUserModalVisible,
            closeEditUserModal,
            updateData,
            payoffModalData,
            updateRepayment,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={editUserModalVisible} onClose={closeEditUserModal} title={'編輯經理人基本資料'}>
            <form action="">
                <div className="mb-4 row">
                    <label htmlFor="userAccount" className="col-sm-2 col-form-label fs-5">
                        經理人代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={payoffModalData.account}
                            id="userAccount"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userName" className="col-sm-2 col-form-label fs-5">
                        經理人名稱
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
                        AD帳號
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
                    <label htmlFor="payoffFee" className="col-sm-2 col-form-label fs-5">
                        群組
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="group"
                            id="short-term"
                            value={3}
                            checked={parseInt(payoffModalData.status) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="group"
                            id="long-term"
                            value={0}
                            checked={parseInt(payoffModalData.status) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="long-term">
                            長投
                        </label>
                    </div>
                </div>
                <div className="mb-4 row align-items-center border-bottom pb-5">
                    <label htmlFor="payoffStatus" className="col-sm-2 col-form-label fs-5">
                        權限
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="payoffStatus"
                            id="pending"
                            value={3}
                            checked={parseInt(payoffModalData.status) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="pending">
                            停用帳號
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="payoffStatus"
                            id="success"
                            value={0}
                            checked={parseInt(payoffModalData.status) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="success">
                            檢視權限
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="payoffStatus"
                            id="fail"
                            value={1}
                            checked={parseInt(payoffModalData.status) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="fail">
                            交易權限
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-between align-items-center m-5">
                    <li>
                        <Button
                            onClick={() => {
                                closeEditUserModal();
                                updateData('editAgentModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                        >
                            代理人設定
                        </Button>
                    </li>
                    <li>
                        <div className="d-flex">
                            <Button
                                onClick={closeEditUserModal}
                                variant="outlined"
                                sx={[btnStyle.btn, btnStyle.btnCancel]}
                            >
                                取消
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={[btnStyle.btn, btnStyle.btnCreate]}
                                onClick={() => {
                                    closeEditUserModal();

                                    updateData('userInfoModalVisible', true);
                                }}
                                disabled={statusDisabled}
                            >
                                更新資料庫
                            </Button>
                        </div>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditUserModal);
