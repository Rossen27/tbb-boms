import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stkDeposit';

const EditStkDepositModal = () => {
    const {
        StkDepositStore: { editStkDepositModalVisible, closeEditStkDepositModal, updateData, stkDepositData },
    } = useStore();

    return (
        <ModalEdit open={editStkDepositModalVisible} onClose={closeEditStkDepositModal} title={'編輯交易庫存數量'}>
            <form>
                <div className="mb-4 row">
                    <label htmlFor="depositDate" className="col-sm-2 col-form-label fs-5">
                        庫存日期
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={stkDepositData.depositDate}
                            id="depositDate"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="accID" className="col-sm-2 col-form-label fs-5">
                        客戶代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={stkDepositData.accID}
                            disabled
                            id="accID"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="brkid" className="col-sm-2 col-form-label fs-5">
                        券商代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="brkid"
                            value={stkDepositData.brkid}
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="stockID" className="col-sm-2 col-form-label fs-5">
                        股票代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={stkDepositData.stockID}
                            id="stockID"
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="longQty" className="col-sm-2 col-form-label fs-5">
                        長投庫存股數
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="tel"
                            className="form-control w-40 fs-5"
                            value={stkDepositData.longQty}
                            id="longQty"
                            onChange={e => {
                                runInAction(() => {
                                    stkDepositData.longQty = removeNonNumeric(e.target.value);
                                    updateData('stkDepositData', stkDepositData);
                                });
                            }}
                        />
                    </div>
                </div>

                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={closeEditStkDepositModal}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                            onClick={e => {
                                e.preventDefault();

                                if (
                                    removeSpace(toString(stkDepositData.longQty)) &&
                                    parseInt(stkDepositData.longQty) > 0
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('stkDepositInfoModalVisible', true);
                                closeEditStkDepositModal();
                            }}
                        >
                            更新資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditStkDepositModal);
