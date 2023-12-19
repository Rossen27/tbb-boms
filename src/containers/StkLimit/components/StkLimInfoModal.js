import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle, limTypeText } from '../constant/stkLimit';
import { removeNonNumeric, addCommas } from '@helper';
const StkLimInfoModal = () => {
    const {
        StkLimitStore: {
            stkLimInfoModalVisible,
            closeStkLimInfoModal,
            updateData,
            stkLimAFlag,
            stkLimitData,
            cStkLimitData,
            updateStkLimData,
            applyDisabled,
        },
    } = useStore();
    let limTypeT = '';
    if (stkLimAFlag === 'C') {
        limTypeT = cStkLimitData.lim_type;
    } else if (stkLimAFlag === 'U') {
        limTypeT = stkLimitData.lim_type;
    }
    return (
        <ModalEdit open={stkLimInfoModalVisible} onClose={closeStkLimInfoModal} title={'確認交易限額資料'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {stkLimAFlag === 'C' ? '新增' : '更新'}資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                額度日期
                            </th>
                            <td>{stkLimAFlag === 'C' ? cStkLimitData.lim_date : stkLimitData.lim_date}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                契約代號
                            </th>
                            <td>{stkLimAFlag === 'C' ? cStkLimitData.manager_id : stkLimitData.manager_id}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                上市櫃
                            </th>
                            <td>{limTypeText[limTypeT]?.text || ''}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                操作限額
                            </th>
                            <td>
                                {stkLimAFlag === 'C'
                                    ? addCommas(removeNonNumeric(cStkLimitData.lim_val || ''))
                                    : addCommas(removeNonNumeric(stkLimitData.lim_val || ''))}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ul className="d-flex justify-content-center">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                if (stkLimAFlag === 'C') {
                                    updateData('createStkLimModalVisible', true);
                                } else if (stkLimAFlag === 'U') {
                                    updateData('editStkLimModalVisible', true);
                                }
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
                                let postData = {};
                                if (stkLimAFlag === 'C') {
                                    postData = {
                                        manager_id: cStkLimitData.manager_id,
                                        lim_date: cStkLimitData.lim_date,
                                        lim_type: cStkLimitData.lim_type,
                                        lim_val: removeNonNumeric(cStkLimitData.lim_val),
                                        actionFlag: stkLimAFlag,
                                    };
                                } else if (stkLimAFlag === 'U') {
                                    postData = {
                                        manager_id: stkLimitData.manager_id,
                                        lim_date: stkLimitData.lim_date,
                                        lim_type: stkLimitData.lim_type,
                                        lim_val: removeNonNumeric(stkLimitData.lim_val),
                                        actionFlag: stkLimAFlag,
                                    };
                                }

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
