import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { bsTypeText, tradeTypeName, opCodeName, rtnCodeText, opStatusText } from './constant/dealOrder';
import {
    PersistentDrawer,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    Table,
    ButtonExport,
    CustomDatePicker,
} from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// import ExcelJS from 'exceljs';

const DealOrder = () => {
    const {
        DealOrderStore: { dealOrderList, queryTime, getQryDealOrderList, reset, params, paramsUpdate },
    } = useStore();
    const { startDate, endDate } = params;

    const columns = [
        {
            field: 'orderDate',
            headerName: '委託日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
            sortingOrder: ['asc', 'desc'],
        },
        {
            field: 'TxOrderID',
            headerName: '交易序號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'accID',
            headerName: '契約編號',
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
            field: 'price',
            headerName: '委託價格',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'bsType',
            headerName: '買賣別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                return <p>{bsTypeText.filter(item => item.value === params.row.bsType).map(item => item.text)}</p>;
            },
        },
        {
            field: 'brkid',
            headerName: '下單券商',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'account',
            headerName: '下單券商帳號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'orderQty',
            headerName: '委託股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'tradeType',
            headerName: '交易別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => <p>{tradeTypeName[params.row.tradeType].text}</p>,
        },
        {
            field: 'payDate',
            headerName: '交割日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'netNo',
            headerName: '網路單號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'brkOrderNo',
            headerName: '券商委託單號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'opCode',
            headerName: '操作類別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => <p>{opCodeName[params.row.opCode].text}</p>,
        },
        {
            field: 'priceLimit',
            headerName: '委託限制價格',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'buserId',
            headerName: '後台經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'bupdDate',
            headerName: '後台更新日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'bupdTime',
            headerName: '後台更新時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'amount',
            headerName: '成交金額',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'fee',
            headerName: '手續費',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'txrate',
            headerName: '交易稅',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'cost',
            headerName: '淨收付金額',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'rtnCode',
            headerName: '錯誤代碼',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                return <p>{rtnCodeText.filter(item => item.value === params.row.rtnCode).map(item => item.text)}</p>;
            },
        },
        {
            field: 'rtnMsg',
            headerName: '錯誤訊息',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'opStatus',
            headerName: '操作狀態',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => <p>{opStatusText[params.row.opStatus].text}</p>,
        },
        {
            field: 'orderTime',
            headerName: '下單時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'sOrderId',
            headerName: '母單單號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'userID',
            headerName: '經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'actionUser',
            headerName: '實際下單者',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'updDate',
            headerName: '更新日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'updTime',
            headerName: '更新時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'updUser',
            headerName: '更新使用者',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            getQryDealOrderList();
        }
    };
    useEffect(() => {
        getQryDealOrderList();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PersistentDrawer>
            <div>
                <Layout title={'成交轉檔資料查詢'}>
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
                                    getQryDealOrderList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryDealOrderList();
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
                        <Table
                            header={columns}
                            data={dealOrderList}
                            getRowId={row => row.orderDate + row.TxOrderID + row.accID}
                        />
                    </section>
                </Layout>
                {/* <EditUserModal />
                <EditInfoModal />
                <CreateUserModal />
                <CreateAgentModal />
                <EditAgentModal /> */}
            </div>
        </PersistentDrawer>
    );
};

export default observer(DealOrder);
