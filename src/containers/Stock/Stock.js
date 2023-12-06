import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Layout from '@containers/Layout';
import {
    PersistentDrawer,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    Table,
    Loading,
    CompleteInfo,
    ButtonExport,
} from '@components';
import { pGroupText, btnStyle } from './constant/stock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, TextField } from '@mui/material';
import CreateStockModal from './components/CreateStockModal';
import EditStockModal from './components/EditStockModal';
import StockInfoModal from './components/StockInfoModal';
// import QueryStockModal from './components/QueryStockModal';
// import ExcelJS from 'exceljs';

const Stock = () => {
    const {
        StockStore: {
            pGroupOptions,
            stockAllowList,
            resetStockAllowData,
            queryTime,
            updateData,
            getQryStockAllowList,
            reset,
            params,
            paramsUpdate,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
            getSyncStkAllowData,
        },
        LoginStore: { traderInfo },
    } = useStore();
    const { stockNo, kind } = params;

    const columns = [
        {
            field: 'id',
            headerName: '序號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'kind',
            headerName: '類別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
            sortable: false,
            renderCell: params => {
                return <p>{pGroupText.filter(item => item.value === params.row.kind).map(item => item.text)}</p>;
            },
        },
        {
            field: 'stock_NO',
            headerName: '股票代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'stock_NAME',
            headerName: '股票名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 150,
            flex: 1,
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            traderInfo();
            getQryStockAllowList();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        traderInfo();
        getQryStockAllowList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <Layout title={'可交易股票資料維護'}>
                <div className="d-flex justify-content-between">
                    <ul className="d-flex align-items-center">
                        <li className="me-5">
                            <SelectMultiple
                                title={'類別'}
                                options={pGroupOptions}
                                selectArr={kind}
                                onChange={value => {
                                    paramsUpdate('kind', value);
                                }}
                            />
                        </li>
                        <li className="me-3">
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
                        <li>
                            <ButtonQuery
                                onClick={() => {
                                    getQryStockAllowList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryStockAllowList();
                                }}
                            />
                        </li>
                    </ul>
                    <ul>
                        <Button sx={[btnStyle.btn]} onClick={getSyncStkAllowData}>
                            立即同步
                        </Button>
                        <ButtonCreate
                            onClick={() => {
                                resetStockAllowData();
                                updateData('createStockModalVisible', true);
                                updateData('stockAllowAFlag', 'C');
                            }}
                        />
                    </ul>
                </div>

                <div className="d-flex justify-content-end mt-2 align-items-center">
                    <p className="time">
                        <AccessTimeIcon sx={{ verticalAlign: 'bottom' }} />
                        查詢時間：{queryTime}
                    </p>
                </div>
                <section>
                    {isLoading ? (
                        <Loading isLoading={isLoading} />
                    ) : !updateComplete ? (
                        <Table
                            header={columns}
                            data={stockAllowList}
                            getRowId={row => row.id}
                            onRowClick={params => {
                                updateData('stockAllowData', {
                                    ...params.row,
                                });
                                updateData('editStockModalVisible', true);
                            }}
                        />
                    ) : (
                        <CompleteInfo loadingFail={loadingFail} msg={msg} />
                    )}
                </section>
            </Layout>
            <CreateStockModal />
            <EditStockModal />
            <StockInfoModal />
            {/* <QueryStockModal /> */}
        </PersistentDrawer>
    );
};

export default observer(Stock);
