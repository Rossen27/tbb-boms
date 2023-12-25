import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace, removeNonNumeric, addCommas } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const EditTraderModal = () => {
    const {
        UserStore: { editUserModalVisible, closeEditUserModal, updateData, userAFlag, userData },
    } = useStore();
    return (
        <ModalEdit open={editUserModalVisible} onClose={closeEditUserModal} title={'編輯契約編號'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="userID" className="col-sm-2 col-form-label fs-5">
                        契約編號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={userData.userID}
                            id="traderID"
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
                            value={userData.userName}
                            id="userName"
                            onChange={e => {
                                runInAction(() => {
                                    userData.userName = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="pGroup" className="col-sm-2 col-form-label fs-5">
                        權限群組
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="short-term"
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
                    {/* <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="long-term"
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
                            value={addCommas(removeNonNumeric(userData.tseQuota || ''))}
                            id="tseQuota"
                            onChange={e => {
                                runInAction(() => {
                                    userData.tseQuota = removeNonNumeric(e.target.value);
                                    updateData('userData', userData);
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
                            checked={parseInt(userData.unit) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    userData.allowType = e.target.value;
                                    updateData('userData', userData);
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
                            disabled
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
                            停用契約
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
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
                                sx={[btnStyle.btn, btnStyle.btnUpdate]}
                                onClick={e => {
                                    e.preventDefault();
                                    if (userAFlag === 'U') {
                                        if (
                                            removeSpace(userData.userName) &&
                                            userData.pGroup &&
                                            userData.allowType != null &&
                                            userData.tseQuota > 0
                                        ) {
                                            updateData('applyDisabled', false);
                                        } else {
                                            updateData('applyDisabled', true);
                                        }
                                    }
                                    updateData('userInfoModalVisible', true);
                                    closeEditUserModal();
                                }}
                            >
                                更新資料
                            </Button>
                        </div>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditTraderModal);
