import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { pGroupText, btnStyle } from '../constant/userList';
import { removeNonNumeric, addCommas } from '@helper';
const TraderInfoModal = () => {
    const {
        UserStore: {
            userInfoModalVisible,
            closeUserInfoModal,
            updateData,
            cUserData,
            userData,
            updateUserData,
            applyDisabled,
            userAFlag,
        },
    } = useStore();
    let allowTypeText = '';
    const allowType = userAFlag === 'C' ? cUserData.allowType : userData.allowType;

    if (parseInt(allowType) === 1) {
        allowTypeText = '交易權限';
    } else if (parseInt(allowType) === 3) {
        allowTypeText = '停用契約';
    }

    let unitText = '';
    if (parseInt(userData.unit) === 0 || parseInt(cUserData.unit) === 0) {
        unitText = '信託部';
    } else if (parseInt(userData.unit) === 1 || parseInt(cUserData.unit) === 1) {
        unitText = '資訊技術部';
    }
    return (
        <ModalEdit
            open={userInfoModalVisible}
            onClose={() => {
                closeUserInfoModal();
            }}
            title={'確認契約編號資料'}
        >
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {userAFlag === 'C' ? '新增' : '更新'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約編號
                            </th>
                            <td>{userAFlag === 'C' ? cUserData.userID : userData.userID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約名稱
                            </th>
                            <td>{userAFlag === 'C' ? cUserData.userName : userData.userName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                權限群組
                            </th>
                            <td>
                                {userAFlag === 'C'
                                    ? pGroupText.filter(item => item.value === cUserData.pGroup).map(item => item.text)
                                    : pGroupText.filter(item => item.value === userData.pGroup).map(item => item.text)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                操作限額
                            </th>
                            <td>
                                {userAFlag === 'C'
                                    ? addCommas(removeNonNumeric(cUserData.tseQuota || ''))
                                    : addCommas(removeNonNumeric(userData.tseQuota || ''))}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                使用單位
                            </th>
                            <td>{unitText}</td>
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
                                        userID: cUserData.userID,
                                        userName: cUserData.userName,
                                        allowType: cUserData.allowType,
                                        unit: cUserData.unit,
                                        pGroup: cUserData.pGroup,
                                        tseQuota: removeNonNumeric(cUserData.tseQuota),
                                        actionFlag: userAFlag,
                                    };
                                } else if (userAFlag === 'U') {
                                    postData = {
                                        userID: userData.userID,
                                        userName: userData.userName,
                                        allowType: userData.allowType,
                                        unit: userData.unit,
                                        pGroup: userData.pGroup,
                                        tseQuota: removeNonNumeric(userData.tseQuota),
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

export default observer(TraderInfoModal);
