import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { pGroupText, btnStyle, allowTypeText } from '../constant/userList';
const UserInfoModal = () => {
    const {
        UserListStore: {
            userInfoModalVisible,
            closeUserInfoModal,
            updateData,
            cUserName,
            cUserID,
            cADID,
            userData,
            resetUserData,
        },
    } = useStore();
    return (
        <ModalEdit
            open={userInfoModalVisible}
            onClose={() => {
                closeUserInfoModal();
                resetUserData();
            }}
            title={'確認經理人基本資料'}
        >
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    closeUserInfoModal();
                }}
            >
                {/* <h3 className="title fw-bolder mb-4 text-danger text-center">新增</h3> */}
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-４">新增資料，請確認：</th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                代號
                            </th>
                            <td>{cUserID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                名稱
                            </th>
                            <td>{cUserName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                AD帳號
                            </th>
                            <td>{cADID}</td>
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
                            <td>{userData.allowType && allowTypeText[userData.allowType].text}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            updateData('createUserModalVisible', true);
                            closeUserInfoModal();
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button type="submit" variant="contained" sx={[btnStyle.btn, btnStyle.btnCreate]}>
                        確認變更
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(UserInfoModal);
