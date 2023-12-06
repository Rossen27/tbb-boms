import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const CreateUserModal = () => {
    const {
        UserStore: { createUserModalVisible, closeCreateUserModal, updateData, userData, cUserID, cUserName },
    } = useStore();

    return (
        <ModalEdit
            open={createUserModalVisible}
            onClose={() => {
                closeCreateUserModal();
            }}
            title={'新增契約編號'}
        >
            <form>
                <div className="mb-4 row">
                    <label htmlFor="userID" className="col-sm-2 col-form-label fs-5">
                        契約編號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            required
                            value={cUserID}
                            id="userID"
                            onChange={e => {
                                runInAction(() => {
                                    const userID = e.target.value;
                                    updateData('cUserID', userID);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userName" className="col-sm-2 col-form-label fs-5">
                        使用者名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            id="userName"
                            required
                            value={cUserName}
                            onChange={e => {
                                runInAction(() => {
                                    const userName = e.target.value;
                                    updateData('cUserName', userName);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="pGroup" className="col-sm-2 col-form-label fs-5">
                        群組
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="short-term"
                            required
                            value={'T'}
                            checked={userData.pGroup === 'T'}
                            onChange={e => {
                                runInAction(() => {
                                    userData.pGroup = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="long-term"
                            required
                            value={'B'}
                            checked={userData.pGroup === 'B'}
                            onChange={e => {
                                runInAction(() => {
                                    userData.pGroup = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="long-term">
                            長投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="pgAdmin"
                            value={'S'}
                            checked={userData.pGroup === 'S'}
                            onChange={e => {
                                runInAction(() => {
                                    userData.pGroup = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="pgAdmin">
                            管理
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="strategic"
                            value={'A'}
                            checked={userData.pGroup === 'A'}
                            onChange={e => {
                                runInAction(() => {
                                    userData.pGroup = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="strategic">
                            策略
                        </label>
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
                            checked={parseInt(userData.unit) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    userData.unit = e.target.value;
                                    updateData('userData', userData);
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
                            checked={parseInt(userData.unit) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    userData.unit = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="admin">
                            資訊技術部
                        </label>
                    </div>
                </div>
                <div className="mb-4 row align-items-center border-bottom pb-5">
                    <label htmlFor="allowType" className="col-sm-2 col-form-label fs-5">
                        權限
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="view"
                            value={0}
                            checked={parseInt(userData.allowType) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    userData.allowType = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="view">
                            檢視權限
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="trade"
                            value={1}
                            checked={parseInt(userData.allowType) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    userData.allowType = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="trade">
                            交易權限
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="disable"
                            value={3}
                            checked={parseInt(userData.allowType) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    userData.allowType = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="disable">
                            停用帳號
                        </label>
                    </div>
                </div>
                <ul className="d-flex justify-content-center m-5">
                    <li>
                        <Button
                            onClick={closeCreateUserModal}
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
                            onClick={e => {
                                e.preventDefault();
                                if (
                                    removeSpace(cUserID) &&
                                    removeSpace(cUserName) &&
                                    userData.pGroup &&
                                    userData.unit != null &&
                                    userData.allowType != null
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('userInfoModalVisible', true);
                                closeCreateUserModal();
                            }}
                        >
                            新增資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateUserModal);
