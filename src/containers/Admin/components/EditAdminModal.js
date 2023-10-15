import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/admin';
const EditAdminModal = () => {
    const {
        AdminStore: {
            editAdminModalVisible,
            closeEditAdminModal,
            updateData,
            adminData,
            updateRepayment,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={editAdminModalVisible} onClose={closeEditAdminModal} title={'編輯管理員資料'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="userID" className="col-sm-2 col-form-label fs-5">
                        管理員代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={adminData.userID}
                            id="userID"
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
                            value={adminData.userName}
                            id="userName"
                            onChange={e => {
                                runInAction(() => {
                                    adminData.userName = e.target.value;
                                    updateData('adminData', adminData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="adid" className="col-sm-2 col-form-label fs-5">
                        AD帳號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="adid"
                            value={adminData.adid}
                            onChange={e => {
                                runInAction(() => {
                                    adminData.adid = e.target.value;
                                    updateData('adminData', adminData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="unit" className="col-sm-2 col-form-label fs-5">
                        使用單位
                    </label>
                    <div className="form-check form-check-inline col-sm-3 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="unit"
                            id="user"
                            value={0}
                            checked={parseInt(adminData.unit) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    adminData.unit = e.target.value;
                                    updateData('adminData', adminData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="user">
                            證券部
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-3 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="unit"
                            id="admin"
                            value={1}
                            checked={parseInt(adminData.unit) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    adminData.unit = e.target.value;
                                    updateData('adminData', adminData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="admin">
                            資訊技術部
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={closeEditAdminModal}
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
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                            onClick={e => {
                                e.preventDefault();
                                if (removeSpace(adminData.userName) && removeSpace(adminData.adid) && adminData.unit) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('adminInfoModalVisible', true);
                                closeEditAdminModal();
                            }}
                        >
                            更新資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditAdminModal);
