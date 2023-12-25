import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace, removeNonNumeric, addCommas } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const CreateUserModal = () => {
    const {
        UserStore: { createUserModalVisible, closeCreateUserModal, cUserData, updateData },
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
                            value={cUserData.userID}
                            id="userID"
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.userID = e.target.value;
                                    updateData('cUserData', cUserData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userName" className="col-sm-2 col-form-label fs-5">
                        契約名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            id="userName"
                            required
                            value={cUserData.userName}
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.userName = e.target.value;
                                    updateData('cUserData', cUserData);
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
                            checked={cUserData.pGroup === 'T'}
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.pGroup = e.target.value;
                                    updateData('cUserData', cUserData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    {/* <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
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
                    </div> */}
                </div>
                <div className="mb-4 row">
                    <label htmlFor="tseQuota" className="col-sm-2 col-form-label fs-5">
                        上市額度
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="tel"
                            className="form-control w-40 fs-5"
                            value={addCommas(removeNonNumeric(cUserData.tseQuota))}
                            id="tseQuota"
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.tseQuota = addCommas(removeNonNumeric(e.target.value));
                                    updateData('cUserData', cUserData);
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
                            checked={parseInt(cUserData.unit) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.unit = e.target.value;
                                    updateData('cUserData', cUserData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="user">
                            信託部
                        </label>
                    </div>
                    {/* <div className="form-check form-check-inline col-sm-3 me-0 mb-0">
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
                    </div> */}
                </div>
                <div className="mb-4 row align-items-center border-bottom pb-5">
                    <label htmlFor="allowType" className="col-sm-2 col-form-label fs-5">
                        權限
                    </label>
                    {/* <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
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
                    </div> */}
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="trade"
                            value={1}
                            checked={parseInt(cUserData.allowType) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.allowType = e.target.value;
                                    updateData('cUserData', cUserData);
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
                            checked={parseInt(cUserData.allowType) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    cUserData.allowType = e.target.value;
                                    updateData('cUserData', cUserData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="disable">
                            停用契約
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
                                    removeSpace(cUserData.userID) &&
                                    removeSpace(cUserData.userName) &&
                                    cUserData.pGroup &&
                                    cUserData.unit != null &&
                                    cUserData.allowType != null &&
                                    parseInt(cUserData.tseQuota) > 0
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
