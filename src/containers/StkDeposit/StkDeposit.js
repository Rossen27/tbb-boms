import React, { useEffect } from 'react';
import { useStore } from '@store';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { inActionText, pGroupText } from './constant/stkDeposit';
import {
    PersistentDrawer,
    Loading,
    CompleteInfo,
    ButtonQuery,
    ButtonReset,
    Table,
    ButtonExport,
    CustomDatePicker,
} from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditStkDepositModal from './components/EditStkDepositModal';
import StkDepositInfoModal from './components/StkDepositInfoModal';

// import ExcelJS from 'exceljs';

const StkDeposit = () => {
    const {
        StkDepositStore: {
            stkDepositList,
            updateData,
            queryTime,
            getQryStkDepositList,
            reset,
            params,
            paramsUpdate,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
        },
        LoginStore: { traderInfo },
    } = useStore();
    const { startDate, endDate } = params;

    const columns = [
        {
            field: 'depositDate',
            headerName: '庫存日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
            sortingOrder: ['asc', 'desc'],
        },
        {
            field: 'userID',
            headerName: '契約編號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'brkid',
            headerName: '券商代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'stockID',
            headerName: '股票代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'originalQty',
            headerName: '昨庫存股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'effectQty',
            headerName: '剩餘有效股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'dealQty',
            headerName: '今日成交股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'inAction',
            headerName: '處理訊號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                return <p>{inActionText.filter(item => item.value === params.row.inAction).map(item => item.text)}</p>;
            },
        },
        {
            field: 'longQty',
            headerName: '長投庫存股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'pGroup',
            headerName: '權限群組',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                return <p>{pGroupText.filter(item => item.value === params.row.pGroup).map(item => item.text)}</p>;
            },
        },
        {
            field: 'buyDealQty',
            headerName: '買單成交數量',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        // {
        //     field: 'account',
        //     headerName: '券商客戶帳號',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        // },
        // {
        //     field: 'updDate',
        //     headerName: '更新日期',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        // },
        // {
        //     field: 'updTime',
        //     headerName: '更新時間',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        // },
        // {
        //     field: 'updUser',
        //     headerName: '更新使用者',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        // },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            traderInfo();
            getQryStkDepositList();
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
        getQryStkDepositList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <div>
                <Layout title={'契約庫存資料維護查詢'}>
                    <ul className="d-flex align-items-center">
                        <li>
                            <CustomDatePicker
                                date={startDate}
                                onChange={value => {
                                    paramsUpdate('startDate', value);
                                }}
                                start={undefined}
                                label={'申請日期(起)'}
                            />
                        </li>
                        <li>
                            <CustomDatePicker
                                date={endDate}
                                onChange={value => {
                                    paramsUpdate('endDate', value);
                                }}
                                start={startDate}
                                label={'申請日期(迄)'}
                            />
                        </li>
                        <li>
                            <ButtonQuery
                                onClick={() => {
                                    getQryStkDepositList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryStkDepositList();
                                }}
                            />
                        </li>
                    </ul>

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
                                data={stkDepositList}
                                getRowId={row => row.depositDate + row.userID + row.brkid + row.stockID}
                                onRowClick={params => {
                                    updateData('stkDepositData', {
                                        ...params.row,
                                    });
                                    updateData('stkDepositAFlag', 'U');
                                    updateData('editStkDepositModalVisible', true);
                                }}
                            />
                        ) : (
                            <CompleteInfo loadingFail={loadingFail} msg={msg} />
                        )}
                    </section>
                </Layout>
                <EditStkDepositModal />
                <StkDepositInfoModal />
            </div>
        </PersistentDrawer>
    );
};

export default observer(StkDeposit);
