import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const EditUserModal = () => {
    const {
        UserListStore: {
            editUserModalVisible,
            closeEditUserModal,
            updateData,
            aFlag,
            cUserID,
            cUserName,
            cADID,
            userData,
            getQryAgentList,
            agentParams,
        },
    } = useStore();
    const { userID } = agentParams;
    return (
        <ModalEdit open={editUserModalVisible} onClose={closeEditUserModal} title={'編輯經理人基本資料'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="userID" className="col-sm-2 col-form-label fs-5">
                        經理人代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            readOnly
                            value={userData.userID}
                            id="userID"
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
                <div className="mb-4 row">
                    <label htmlFor="adid" className="col-sm-2 col-form-label fs-5">
                        AD帳號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="adid"
                            value={userData.adid}
                            onChange={e => {
                                runInAction(() => {
                                    userData.adid = e.target.value;
                                    updateData('userData', userData);
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
                            id="admin"
                            value={'S'}
                            checked={userData.pGroup === 'S'}
                            onChange={e => {
                                runInAction(() => {
                                    userData.pGroup = e.target.value;
                                    updateData('userData', userData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="admin">
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

                <ul className="d-flex justify-content-between align-items-center m-5">
                    <li>
                        <Button
                            onClick={() => {
                                closeEditUserModal();
                                getQryAgentList(userData.userID);
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
                                onClick={e => {
                                    e.preventDefault();
                                    console.log('u', userData);
                                    console.log(removeSpace(userData.userName) && removeSpace(userData.adid));
                                    if (aFlag === 'U') {
                                        if (removeSpace(userData.userName) && removeSpace(userData.adid)) {
                                            console.log('a');
                                            updateData('applyDisabled', false);
                                        } else {
                                            console.log('b');
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

export default observer(EditUserModal);
