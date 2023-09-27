import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/admin';
const CreateAdminModal = () => {
    const {
        AdminStore: {
            createAdminModalVisible,
            closeCreateAdminModal,
            updateData,
            payoffModalData,
            updateRepayment,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={createAdminModalVisible} onClose={closeCreateAdminModal} title={'新增管理員資料'}>
            <form action="">
                <div className="mb-4 row">
                    <label htmlFor="userAccount" className="col-sm-2 col-form-label fs-5">
                        管理員代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value=""
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
                        管理員名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value=""
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
                            value=""
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
                        使用單位
                    </label>
                    <div className="form-check form-check-inline col-sm-3 me-0 mb-0">
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
                            證券部
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-3 me-0 mb-0">
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
                            資訊技術部
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={() => {
                                closeCreateAdminModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            onClick={() => {
                                closeCreateAdminModal();
                                updateData('adminInfoModalVisible', true);
                            }}
                            disabled={statusDisabled}
                        >
                            更新資料庫
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateAdminModal);
