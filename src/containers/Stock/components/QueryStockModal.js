import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button, TextField } from '@mui/material';
import { btnStyle } from '../constant/stock';
const QueryStockModal = () => {
    const {
        StockStore: { queryStockModalVisible, closeQueryStockModal, params, paramsUpdate },
    } = useStore();
    const { stockNo, stockName } = params;
    const columns = [
        {
            field: 'bhno',
            headerName: '股票代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'name',
            headerName: '股票名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
    ];
    return (
        <ModalEdit open={queryStockModalVisible} onClose={closeQueryStockModal} title={'股票查詢'}>
            <form action="">
                <ul className="d-flex align-items-center m-5">
                    <li className="col-3">
                        <TextField
                            id="outlined-basic"
                            label="股票代號"
                            variant="outlined"
                            size="small"
                            value={stockNo}
                            onChange={e => {
                                paramsUpdate('stockNo', e.target.value);
                            }}
                            sx={{ width: '120px' }}
                        />
                    </li>
                    <li className="col-2">
                        <TextField
                            id="outlined-basic"
                            label="股票名稱"
                            variant="outlined"
                            size="small"
                            value={stockName}
                            onChange={e => {
                                paramsUpdate('stockName', e.target.value);
                            }}
                            sx={{ width: '120px' }}
                        />
                    </li>
                    <li className="col-2 offset-1">
                        <Button
                            onClick={closeQueryStockModal}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_sm, btnStyle.btnQuery]}
                        >
                            查詢
                        </Button>
                    </li>
                    <li className="col-2">
                        <Button
                            onClick={closeQueryStockModal}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_sm, btnStyle.btnCreate]}
                        >
                            新增
                        </Button>
                    </li>
                    {/* <li className="col-2">
                        <Button
                            onClick={() => {
                                closeQueryStockModal();
                                updateData('editTraderModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btn_sm, btnStyle.btnCancel]}
                            className=""
                        >
                            取消
                        </Button>
                    </li> */}
                </ul>
                <section>
                    {/* <Table
                        header={columns}
                        data={repaymentDetailList}
                        onRowClick={params => {
                            updateData('payoffModalData', {
                                ...params.row,
                            });
                            updateData('editTraderModalVisible', true);
                            if (parseInt(params.row.status) !== 3) {
                                updateData('statusDisabled', true);
                            } else {
                                updateData('statusDisabled', false);
                            }
                        }} */}

                    {/* /> */}
                </section>
            </form>
        </ModalEdit>
    );
};

export default observer(QueryStockModal);
