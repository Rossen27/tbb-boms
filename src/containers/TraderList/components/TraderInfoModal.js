import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { pGroupText, btnStyle } from '../constant/traderList';
const TraderInfoModal = () => {
    const {
        TraderListStore: {
            traderInfoModalVisible,
            closeTraderInfoModal,
            updateData,
            cTraderName,
            cTraderID,
            traderData,
            updateTraderData,
            applyDisabled,
            userAFlag,
        },
    } = useStore();
    let allowTypeText = '';
    if (parseInt(traderData.allowType) === 0) {
        allowTypeText = '檢視權限';
    } else if (parseInt(traderData.allowType) === 1) {
        allowTypeText = '交易權限';
    } else if (parseInt(traderData.allowType) === 3) {
        allowTypeText = '停用帳號';
    }
    return (
        <ModalEdit
            open={traderInfoModalVisible}
            onClose={() => {
                closeTraderInfoModal();
            }}
            title={'確認經理人基本資料'}
        >
            <form>
                {/* <h3 className="title fw-bolder mb-4 text-danger text-center">新增</h3> */}
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
                            <td>{userAFlag === 'C' ? cTraderID : traderData.traderID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                經理人名稱
                            </th>
                            <td>{userAFlag === 'C' ? cTraderName : traderData.traderName}</td>
                        </tr>
                        {/* <tr>
                            <th scope="row" className="text-end">
                                AD帳號
                            </th>
                            <td>{userAFlag === 'C' ? cADID : traderData.adid}</td>
                        </tr> */}
                        {/* <tr>
                            <th scope="row" className="text-end">
                                群組
                            </th>
                            <td>{pGroupText.filter(item => item.value === traderData.pGroup).map(item => item.text)}</td>
                        </tr> */}
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
                                    updateData('createTraderModalVisible', true);
                                } else if (userAFlag === 'U') {
                                    updateData('editTraderModalVisible', true);
                                }
                                closeTraderInfoModal();
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
                                        traderID: cTraderID,
                                        traderName: cTraderName,
                                        // adid: cADID,
                                        allowType: traderData.allowType,
                                        // pGroup: traderData.pGroup,
                                        actionFlag: userAFlag,
                                    };
                                } else if (userAFlag === 'U') {
                                    postData = {
                                        traderID: traderData.traderID,
                                        traderName: traderData.traderName,
                                        // adid: traderData.adid,
                                        allowType: traderData.allowType,
                                        // pGroup: traderData.pGroup,
                                        actionFlag: userAFlag,
                                    };
                                }
                                await updateTraderData(postData);
                                closeTraderInfoModal();
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
