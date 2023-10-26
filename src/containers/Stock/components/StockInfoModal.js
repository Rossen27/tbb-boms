import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle, pGroupText, actionText } from '../constant/stock';
const StockInfoModal = () => {
    const {
        StockStore: {
            stockInfoModalVisible,
            closeStockInfoModal,
            updateData,
            stockAllowAFlag,
            stockAllowData,
            cStockNO,
            updateStockAllowData,
            applyDisabled,
        },
    } = useStore();

    return (
        <ModalEdit open={stockInfoModalVisible} onClose={closeStockInfoModal} title={'確認新增可交易股票資料'}>
            <form>
                <table className="table table-borderless w-75">
                    <tbody>
                        <tr>
                            <th className="title fw-bolder mb-4 text-danger text-end fs-4">
                                {actionText.filter(item => item.value === stockAllowAFlag).map(item => item.text)}
                                資料，請確認：
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                類別
                            </th>
                            <td>
                                {pGroupText.filter(item => item.value === stockAllowData.kind).map(item => item.text)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-end">
                                股票代號
                            </th>
                            <td>{stockAllowAFlag === 'C' ? cStockNO : stockAllowData.stock_NO}</td>
                        </tr>
                        {/* <tr>
                            <th scope="row" className="text-end">
                                股票名稱
                            </th>
                            <td>{stockAllowAFlag === 'C' ? cStockName : stockAllowData.stock_NAME}</td>
                        </tr> */}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            if (stockAllowAFlag === 'C') {
                                updateData('createStockModalVisible', true);
                            } else {
                                updateData('editStockModalVisible', true);
                            }
                            closeStockInfoModal();
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}
                        onClick={async e => {
                            e.preventDefault();
                            updateData('applyDisabled', true);
                            let postData = {};
                            if (stockAllowAFlag === 'C') {
                                postData = {
                                    stockNO: cStockNO,
                                    // stockName: cStockName,
                                    kind: stockAllowData.kind,
                                    actionFlag: stockAllowAFlag,
                                };
                            } else if (stockAllowAFlag === 'U' || stockAllowAFlag === 'D') {
                                postData = {
                                    stockNO: stockAllowData.stock_NO,
                                    // stockName: stockAllowData.stock_NAME,
                                    kind: stockAllowData.kind,
                                    actionFlag: stockAllowAFlag,
                                };
                            }
                            console.log('postData', postData);
                            await updateStockAllowData(postData);
                            closeStockInfoModal();
                        }}
                        disabled={applyDisabled}
                    >
                        資料確認
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(StockInfoModal);
