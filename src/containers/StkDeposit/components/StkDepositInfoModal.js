import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/stkDeposit';

const StkDepositInfoModal = () => {
    const {
        StkDepositStore: {
            stkDepositInfoModalVisible,
            closeStkDepositInfoModal,
            updateData,
            stkDepositAFlag,
            stkDepositData,
            updateStkDepositData,
            applyDisabled,
        },
    } = useStore();
    return (
        <ModalEdit open={stkDepositInfoModalVisible} onClose={closeStkDepositInfoModal} title={'確認交易庫存數量'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-４">更新資料，請確認：</th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                庫存日期
                            </th>
                            <td>{stkDepositData.depositDate}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                客戶代號
                            </th>
                            <td>{stkDepositData.accID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                券商代號
                            </th>
                            <td>{stkDepositData.brkid}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                股票代號
                            </th>
                            <td>{stkDepositData.stockID}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                長投庫存股數
                            </th>
                            <td>{stkDepositData.longQty}</td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                updateData('editStkDepositModalVisible', true);
                                closeStkDepositInfoModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                        >
                            上一步
                        </Button>
                    </li>
                    <li className="ms-3">
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                            onClick={async e => {
                                e.preventDefault();
                                updateData('applyDisabled', true);
                                const postData = {
                                    depositDate: stkDepositData.depositDate,
                                    accID: stkDepositData.accID,
                                    brkid: stkDepositData.brkid,
                                    longQty: stkDepositData.longQty,
                                    stockID: stkDepositData.stockID,
                                    actionFlag: stkDepositAFlag,
                                };

                                await updateStkDepositData(postData);
                                closeStkDepositInfoModal();
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

export default observer(StkDepositInfoModal);
