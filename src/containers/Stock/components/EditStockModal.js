import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stock';
const EditStockModal = () => {
    const {
        StockStore: {
            editStockModalVisible,
            closeEditStockModal,
            updateData,
            stockAllowData,
            stockAllowAFlag,
            statusDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={editStockModalVisible} onClose={closeEditStockModal} title={'編輯可交易股票資料'}>
            <form>
                <div className="mb-4 row align-items-center">
                    <label htmlFor="kind" className="col-sm-2 col-form-label fs-5">
                        群組
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="kind"
                            id="short-term"
                            value={'T'}
                            checked={stockAllowData.kind === 'T'}
                            readOnly
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stockAllowData.kind = e.target.value;
                            //         updateData('stockAllowData', stockAllowData);
                            //     });
                            // }}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="kind"
                            id="long-term"
                            value={'B'}
                            checked={stockAllowData.kind === 'B'}
                            readOnly
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stockAllowData.kind = e.target.value;
                            //         updateData('stockAllowData', stockAllowData);
                            //     });
                            // }}
                        />
                        <label className="form-check-label fs-5" htmlFor="long-term">
                            長投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="kind"
                            id="admin"
                            value={'S'}
                            checked={stockAllowData.kind === 'S'}
                            readOnly
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stockAllowData.kind = e.target.value;
                            //         updateData('stockAllowData', stockAllowData);
                            //     });
                            // }}
                        />
                        <label className="form-check-label fs-5" htmlFor="admin">
                            管理
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="kind"
                            id="strategic"
                            value={'A'}
                            checked={stockAllowData.kind === 'A'}
                            readOnly
                            // onChange={e => {
                            //     runInAction(() => {
                            //         stockAllowData.kind = e.target.value;
                            //         updateData('stockAllowData', stockAllowData);
                            //     });
                            // }}
                        />
                        <label className="form-check-label fs-5" htmlFor="strategic">
                            策略
                        </label>
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="stock_NO" className="col-sm-2 col-form-label fs-5">
                        股票代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={stockAllowData.stock_NO}
                            id="stock_NO"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="stock_NAME" className="col-sm-2 col-form-label fs-5">
                        股票名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={stockAllowData.stock_NAME}
                            id="stock_NAME"
                            disabled
                        />
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={closeEditStockModal}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li className="me-5">
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                closeEditStockModal();
                                updateData('stockAllowAFlag', 'D');
                                if (
                                    removeSpace(stockAllowData.stock_NO) &&
                                    removeSpace(stockAllowData.stock_NAME) &&
                                    stockAllowData.kind
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('stockInfoModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnDelete]}
                        >
                            刪除
                        </Button>
                    </li>
                    {/* <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                            onClick={e => {
                                e.preventDefault();
                                closeEditStockModal();
                                updateData('stockAllowAFlag', 'U');
                                if (
                                    removeSpace(stockAllowData.stock_NO) &&
                                    removeSpace(stockAllowData.stock_NAME) &&
                                    stockAllowData.kind
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('stockInfoModalVisible', true);
                            }}
                        >
                            編輯
                        </Button> 
                     </li> */}
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditStockModal);
