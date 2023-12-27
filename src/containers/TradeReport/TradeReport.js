import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { flagName, bsTypeText } from './constant/tradeReport';
import { PersistentDrawer, ButtonQuery, ButtonReset, Table, CustomDatePicker } from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// import ExcelJS from 'exceljs';

const TradeReport = () => {
    const {
        TradeReportStore: { tradeReportList, queryTime, getQryTradeReportList, reset, params, paramsUpdate },
        LoginStore: { traderInfo },
    } = useStore();
    const { startDate, endDate } = params;

    const columns = [
        {
            field: 'tx_LOG_NO',
            headerName: '交易編號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'tx_TIME',
            headerName: '轉檔時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'manaual_FLAG',
            headerName: '人工登錄',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 120,
            flex: 1,
            sortable: false,
            renderCell: params => <p>{flagName[params.row.manaual_FLAG]?.text || ''}</p>,
        },
        {
            field: 'manager_ID',
            headerName: '交易員代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'tradedate',
            headerName: '交易日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'broker_ID',
            headerName: '券商代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'tradeno',
            headerName: '交易編號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'account',
            headerName: '交易帳號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
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
            field: 'type',
            headerName: '交易別',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                return <p>{bsTypeText.filter(item => item.value === params.row.type).map(item => item.text)}</p>;
            },
        },
        {
            field: 'stocks',
            headerName: '股數',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'price',
            headerName: '單價',
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
            field: 'tx_RATE',
            headerName: '證交稅',
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
            field: 'pay_DATE',
            headerName: '交割日期',
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
            traderInfo();
            getQryTradeReportList();
        }
    };
    useEffect(() => {
        traderInfo();
        getQryTradeReportList();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PersistentDrawer>
            <Layout title={'券商交易成交檔案記錄查詢'}>
                <ul className="d-flex align-items-center">
                    <li>
                        <CustomDatePicker
                            date={startDate}
                            onChange={value => {
                                paramsUpdate('startDate', value);
                            }}
                            start={undefined}
                            label={'轉檔日期(起)'}
                        />
                    </li>
                    <li>
                        <CustomDatePicker
                            date={endDate}
                            onChange={value => {
                                paramsUpdate('endDate', value);
                            }}
                            start={startDate}
                            label={'轉檔日期(迄)'}
                        />
                    </li>
                    <li>
                        <ButtonQuery
                            onClick={() => {
                                getQryTradeReportList();
                            }}
                        />
                    </li>
                    <li>
                        <ButtonReset
                            onClick={() => {
                                reset();
                                getQryTradeReportList();
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
                        data={tradeReportList}
                        getRowId={row => row.tradedate + row.broker_ID + row.tradeno}
                    />
                </section>
            </Layout>
        </PersistentDrawer>
    );
};

export default observer(TradeReport);
