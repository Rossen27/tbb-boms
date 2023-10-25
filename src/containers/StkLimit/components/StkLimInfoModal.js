import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/stkLimit';

const StkLimInfoModal = () => {
    const {
        StkLimitStore: {
            stkLimInfoModalVisible,
            closeStkLimInfoModal,
            updateData,
            stkLimAFlag,
            stkLimitData,
            updateStkLimData,
            applyDisabled,
        },
    } = useStore();
    return (
        <ModalEdit open={stkLimInfoModalVisible} onClose={closeStkLimInfoModal} title={'確認券商資料'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">更新資料，請確認：</th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                額度日期
                            </th>
                            <td>{stkLimitData.lim_date}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                交易員代號
                            </th>
                            <td>{stkLimitData.accId}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                上市櫃
                            </th>
                            <td>{stkLimitData.lim_type === '1' ? '上市' : '上櫃'}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                操作限額
                            </th>
                            <td>{stkLimitData.lim_val}</td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                updateData('editStkLimModalVisible', true);
                                closeStkLimInfoModal();
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
                                    accId: stkLimitData.accId,
                                    lim_date: stkLimitData.lim_date,
                                    lim_type: stkLimitData.lim_type,
                                    lim_val: stkLimitData.lim_val,
                                    actionFlag: stkLimAFlag,
                                };

                                await updateStkLimData(postData);
                                closeStkLimInfoModal();
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

export default observer(StkLimInfoModal);
