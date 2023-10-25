import React from 'react';
import { ModalEdit, Table, SelectInput } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button, TextField } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/stock';
const QueryStockModal = () => {
    const {
        StockStore: {
            queryStockModalVisible,
            closeQueryStockModal,
            updateData,
            payoffModalData,
            repaymentDetailList,
            statusDisabled,
            field,
            keyOptions,
        },
    } = useStore();

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
                <section>
                    <Table
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
                        }}
                        hideFooter={true}
                    />
                </section>
                <ul className="d-flex align-items-center m-5">
                    <li className="col-3">
                        <SelectInput
                            options={keyOptions}
                            selectVal={field}
                            onChange={e => {
                                updateData('field', e.target.value);
                            }}
                        />
                    </li>
                    <li className="col-2">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={''}
                            onChange={e => {
                                updateData('field', e.target.value);
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
            </form>
        </ModalEdit>
    );
};

export default observer(QueryStockModal);
