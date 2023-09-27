import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import {
    PersistentDrawer,
    SelectInput,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    Table,
    ButtonExport,
} from '@components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, TextField } from '@mui/material';
import CreateStockModal from './components/CreateStockModal';
import EditStockModal from './components/EditStockModal';
import StockInfoModal from './components/StockInfoModal';
import QueryStockModal from './components/QueryStockModal';
// import ExcelJS from 'exceljs';

const Stock = () => {
    const {
        StockStore: {
            statusOptions,
            keyOptions,
            applyTypeOptions,
            repaymentAccountTypeOptions,
            repaymentDetailList,
            totalNetPayAmount,
            totalRepayMentAmount,
            totalRepayMentInterest,
            queryTime,
            updateData,
            getQryRepaymentDetail,
            reset,
            params,
            paramsUpdate,
        },
    } = useStore();
    const { keyword, startDate, repaymentAccountType, status, applyType, endDate, field } = params;
    const btnStyle = {
        btn: {
            borderRadius: '36px',
            px: 4,
            minWidth: '120px',
        },
        btnDelete: {
            color: 'white',
            borderColor: '#E24041',
            backgroundColor: '#E24041',
            '&:hover': {
                borderColor: '#E24041',
                backgroundColor: '#f86060',
            },
        },
    };
    const columns = [
        {
            field: 'bhno',
            headerName: '序號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'name',
            headerName: '類別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
            sortable: false,
        },
        {
            field: 'repayMentInterest',
            headerName: '股票代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'netPayAmount',
            headerName: '股票名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 150,
            flex: 1,
        },
        // {
        //     field: 'collateralNumber',
        //     headerName: '編輯',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        //     renderCell: params => (
        //         <Button
        //             onClick={e => {
        //                 console.log(e.target.value);
        //             }}
        //             variant="outlined"
        //             sx={[btnStyle.btn, btnStyle.btnDelete]}
        //         >
        //             刪除
        //         </Button>
        //     ),
        // },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            getQryRepaymentDetail();
        }
    };
    useEffect(() => {
        getQryRepaymentDetail();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PersistentDrawer>
            <div>
                <Layout title={'可交易股票資料維護'}>
                    <div className="d-flex justify-content-between">
                        <ul className="d-flex align-items-center">
                            <li className="me-5">
                                <SelectInput
                                    options={keyOptions}
                                    selectVal={field}
                                    onChange={e => {
                                        paramsUpdate('field', e.target.value);
                                    }}
                                />
                            </li>
                            <li className="me-3">
                                <TextField
                                    id="outlined-basic"
                                    label="股票代號"
                                    variant="outlined"
                                    size="small"
                                    value={keyword}
                                    onChange={e => {
                                        paramsUpdate('keyword', e.target.value);
                                    }}
                                    sx={{ width: '120px' }}
                                />
                            </li>
                            <li>
                                <ButtonQuery
                                    onClick={() => {
                                        getQryRepaymentDetail();
                                    }}
                                />
                            </li>
                            <li>
                                <ButtonReset
                                    onClick={() => {
                                        reset();
                                        getQryRepaymentDetail();
                                    }}
                                />
                            </li>
                        </ul>
                        <ButtonCreate
                            onClick={() => {
                                updateData('createStockModalVisible', true);
                                // getQryRepaymentDetail();
                            }}
                        />
                    </div>

                    <div className="d-flex justify-content-end mt-2 align-items-center">
                        <p className="time">
                            <AccessTimeIcon sx={{ verticalAlign: 'bottom' }} />
                            查詢時間：{queryTime}
                        </p>
                    </div>
                    <section>
                        <Table
                            header={columns}
                            data={repaymentDetailList}
                            onRowClick={params => {
                                updateData('payoffModalData', {
                                    ...params.row,
                                });
                                updateData('editStockModalVisible', true);
                                if (parseInt(params.row.status) !== 3) {
                                    updateData('statusDisabled', true);
                                } else {
                                    updateData('statusDisabled', false);
                                }
                            }}
                        />
                    </section>
                </Layout>

                <CreateStockModal />
                <EditStockModal />
                <StockInfoModal />
                <QueryStockModal />
            </div>
        </PersistentDrawer>
    );
};

export default observer(Stock);
