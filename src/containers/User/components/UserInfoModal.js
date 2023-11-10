import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { pGroupText, btnStyle } from '../constant/userList';
const UserInfoModal = () => {
    const {
        UserStore: {
            userInfoModalVisible,
            closeUserInfoModal,
            updateData,
            cUserName,
            cUserID,
            cADID,
            userData,
            updateUserData,
            applyDisabled,
            userAFlag,
        },
    } = useStore();
    let allowTypeText = '';
    if (parseInt(userData.allowType) === 0) {
        allowTypeText = '檢視權限';
    } else if (parseInt(userData.allowType) === 1) {
        allowTypeText = '交易權限';
    } else if (parseInt(userData.allowType) === 3) {
        allowTypeText = '停用帳號';
    }
    return (
        <ModalEdit
            open={userInfoModalVisible}
            onClose={() => {
                closeUserInfoModal();
            }}
            title={'確認資料'}
        >
            <form>
                <h3 className="title fw-bolder mb-4 text-danger text-center">新增</h3>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {userAFlag === 'C' ? '新增' : '更新'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人代號
                            </th>
                            <td>{userAFlag === 'C' ? cUserID : userData.userID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人名稱
                            </th>
                            <td>{userAFlag === 'C' ? cUserName : userData.userName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                AD帳號
                            </th>
                            <td>{userAFlag === 'C' ? cADID : userData.adid}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                群組
                            </th>
                            <td>{pGroupText.filter(item => item.value === userData.pGroup).map(item => item.text)}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                權限
                            </th>
                            <td>{allowTypeText}</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={() => {
                                if (userAFlag === 'C') {
                                    updateData('createUserModalVisible', true);
                                } else if (userAFlag === 'U') {
                                    updateData('editUserModalVisible', true);
                                }
                                closeUserInfoModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            上一步
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            onClick={async e => {
                                e.preventDefault();
                                updateData('applyDisabled', true);
                                let postData = {};
                                if (userAFlag === 'C') {
                                    postData = {
                                        userID: cUserID,
                                        userName: cUserName,
                                        adid: cADID,
                                        allowType: userData.allowType,
                                        pGroup: userData.pGroup,
                                        actionFlag: userAFlag,
                                    };
                                } else if (userAFlag === 'U') {
                                    postData = {
                                        userID: userData.userID,
                                        userName: userData.userName,
                                        adid: userData.adid,
                                        allowType: userData.allowType,
                                        pGroup: userData.pGroup,
                                        actionFlag: userAFlag,
                                    };
                                }
                                await updateUserData(postData);
                                closeUserInfoModal();
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

export default observer(UserInfoModal);
