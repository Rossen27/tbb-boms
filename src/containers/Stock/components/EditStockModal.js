import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stock';
const EditStockModal = () => {
    const {
        StockStore: {
            editStockModalVisible,
            closeEditStockModal,
            updateData,
            payoffModalData,
            updateRepayment,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={editStockModalVisible} onClose={closeEditStockModal} title={'編輯可交易股票資料'}>
            <form action="">
                <div className="mb-4 row align-items-center">
                    <label htmlFor="payoffFee" className="col-sm-2 col-form-label fs-5">
                        類別
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="group"
                            id="short-term"
                            value={3}
                            checked={parseInt(payoffModalData.status) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="group"
                            id="long-term"
                            value={0}
                            checked={parseInt(payoffModalData.status) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    payoffModalData.status = e.target.value;
                                    updateData('payoffModalData', payoffModalData);
                                });
                            }}
                            disabled={statusDisabled}
                        />
                        <label className="form-check-label fs-5" htmlFor="long-term">
                            長投
                        </label>
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userAccount" className="col-sm-2 col-form-label fs-5">
                        股票代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={payoffModalData.account}
                            id="userAccount"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="userName" className="col-sm-2 col-form-label fs-5">
                        股票名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={payoffModalData.name}
                            id="userName"
                            onChange={e => {
                                runInAction(e => {
                                    console.log(e.target.value);
                                    updateData('payoffModalData', e.target.value);
                                });
                            }}
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <div className="d-flex">
                            {/* <Button
                                onClick={() => {
                                    closeEditStockModal();
                                }}
                                variant="outlined"
                                sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                            >
                                取消
                            </Button> */}
                            <li className="me-5">
                                <Button
                                    onClick={e => {
                                        console.log(e.target.value);
                                    }}
                                    variant="outlined"
                                    sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnDelete]}
                                >
                                    刪除
                                </Button>
                            </li>
                            <Button
                                type="button"
                                variant="contained"
                                sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                                onClick={() => {
                                    closeEditStockModal();
                                    if (parseInt(payoffModalData.status) !== 3) {
                                        updateData('editInfoModalVisible', true);
                                    }
                                }}
                                disabled={statusDisabled}
                            >
                                編輯
                            </Button>
                        </div>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditStockModal);
