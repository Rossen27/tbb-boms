import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/admin';
const AdminInfoModal = () => {
    const {
        AdminStore: {
            adminInfoModalVisible,
            closeAdminInfoModal,
            updateData,
            adminData,
            adminAFlag,
            updateAdminData,
            applyDisabled,
            cUserName,
            cUserID,
            cADID,
        },
    } = useStore();
    let unitText = '';
    if (parseInt(adminData.unit) === 0) {
        unitText = '證券部';
    } else {
        unitText = '資訊技術部';
    }
    return (
        <ModalEdit open={adminInfoModalVisible} onClose={closeAdminInfoModal} title={'確認管理者資料'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {adminAFlag === 'C' ? '新增' : '更新'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                管理員代號
                            </th>
                            <td>{adminAFlag === 'C' ? cUserID : adminData.userID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                管理員名稱
                            </th>
                            <td>{adminAFlag === 'C' ? cUserName : adminData.userName}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                AD帳號
                            </th>
                            <td>{adminAFlag === 'C' ? cADID : adminData.adid}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                使用單位
                            </th>
                            <td>{unitText}</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={() => {
                                closeAdminInfoModal();
                                if (adminAFlag === 'C') {
                                    updateData('createAdminModalVisible', true);
                                } else if (adminAFlag === 'U') {
                                    updateData('editAdminModalVisible', true);
                                }
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                        >
                            上一步
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                            onClick={async e => {
                                e.preventDefault();
                                updateData('applyDisabled', true);
                                let postData = {};
                                if (adminAFlag === 'C') {
                                    postData = {
                                        userID: cUserID,
                                        userName: cUserName,
                                        adid: cADID,
                                        unit: 1,
                                        actionFlag: adminAFlag,
                                    };
                                } else if (adminAFlag === 'U') {
                                    postData = {
                                        userID: adminData.userID,
                                        userName: adminData.userName,
                                        adid: adminData.adid,
                                        unit: adminData.unit,
                                        actionFlag: adminAFlag,
                                    };
                                }
                                await updateAdminData(postData);
                                closeAdminInfoModal();
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

export default observer(AdminInfoModal);
