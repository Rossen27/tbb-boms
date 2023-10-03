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
    const {
        BrokerStore: { getQryBrokerList, brokerList, queryTime, updateData, reset, params, paramsUpdate },
    } = useStore();
    const { brkID, userID } = params;

    const columns = [
        {
            field: 'brkid',
            headerName: '券商代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'brkName',
            headerName: '券商名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'account',
            headerName: '券商帳號',
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
            minWidth: 150,
            flex: 1,
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            getQryBrokerList();
        }
    };
    useEffect(() => {
        getQryBrokerList();
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
                                    value={brkID}
                                    onChange={e => {
                                        paramsUpdate('brkID', e.target.value);
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
                                    value={userID}
                                    onChange={e => {
                                        paramsUpdate('userID', e.target.value);
                                    }}
                                    sx={{ width: '120px' }}
                                />
                            </li>
                            <li>
                                <ButtonQuery
                                    onClick={() => {
                                        getQryBrokerList();
                                    }}
                                />
                            </li>
                            <li>
                                <ButtonReset
                                    onClick={() => {
                                        reset();
                                        getQryBrokerList();
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
                            data={brokerList}
                            getRowId={row => row.brkid}
                            onRowClick={params => {
                                updateData('brokerData', {
                                    ...params.row,
                                });
                                updateData('editBrokerModalVisible', true);
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
