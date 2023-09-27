import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { PersistentDrawer, ButtonQuery, ButtonReset, ButtonCreate, Table, ButtonExport } from '@components';
import { Button, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditBrokerModal from './components/EditBrokerModal';
import BrokerInfoModal from './components/BrokerInfoModal';

// import ExcelJS from 'exceljs';

const Broker = () => {
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
    const {
        BrokerStore: { repaymentDetailList, queryTime, updateData, getQryRepaymentDetail, reset, params, paramsUpdate },
    } = useStore();
    const { keyword, startDate, repaymentAccountType, status, applyType, endDate, field } = params;

    const columns = [
        {
            field: 'bhno',
            headerName: '券商代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'name',
            headerName: '券商名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'repayMentInterest',
            headerName: '券商帳號',
            headerClassName: 'table-header',
            headerAlign: 'right',
            align: 'right',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'collateralNumber',
            headerName: '經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 150,
            flex: 1,
        },
        // {
        //     field: 'cancelBtn',
        //     headerName: '編輯',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     minWidth: 140,
        //     flex: 1,
        //     sortable: false,
        //     renderCell: params => (
        //         <Button
        //             onClick={() => {
        //                 updateData('editBrokerModalVisible', true);
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
                <Layout title={'可下單券商資料維護'}>
                    <div className="d-flex justify-content-between">
                        <ul className="d-flex align-items-center">
                            <li className="me-3">
                                <TextField
                                    id="outlined-basic"
                                    label="券商代號"
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
                                <TextField
                                    id="outlined-basic"
                                    label="經理人代號"
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
                                updateData('editBrokerModalVisible', true);
                                if (parseInt(params.row.status) !== 3) {
                                    updateData('statusDisabled', true);
                                } else {
                                    updateData('statusDisabled', false);
                                }
                            }}
                        />
                    </section>
                </Layout>
                <EditBrokerModal />
                <BrokerInfoModal />
            </div>
        </PersistentDrawer>
    );
};

export default observer(Broker);
