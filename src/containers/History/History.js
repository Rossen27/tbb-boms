import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { functionName } from './constant/history';
import {
    PersistentDrawer,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    Table,
    ButtonExport,
    BasicDateTimePicker,
} from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// import ExcelJS from 'exceljs';

const History = () => {
    const {
        HistoryStore: { functionOptions, logList, queryTime, getQryLogList, reset, params, paramsUpdate },
    } = useStore();
    const { startDate, endDate, functionId } = params;

    const columns = [
        {
            field: 'updDate',
            headerName: '異動時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 220,
            flex: 1,
            sortingOrder: ['asc', 'desc'],
        },
        {
            field: 'functionId',
            headerName: '異動功能',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
            renderCell: params => <p>{functionName[params.row.functionId].text}</p>,
        },
        {
            field: 'description',
            headerName: '異動說明',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'userID',
            headerName: '異動人員',
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
            getQryLogList();
        }
    };
    useEffect(() => {
        getQryLogList();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PersistentDrawer>
            <div>
                <Layout title={'異動修改紀錄'}>
                    <ul className="d-flex align-items-center">
                        <li>
                            <SelectMultiple
                                title={'異動功能'}
                                options={functionOptions}
                                onChange={value => paramsUpdate('functionId', value)}
                                selectArr={functionId}
                            />
                        </li>
                        <li>
                            <BasicDateTimePicker
                                value={startDate}
                                onChange={value => {
                                    paramsUpdate('startDate', value);
                                }}
                                start={undefined}
                                label={'申請日期(起)'}
                            />
                        </li>
                        <li>
                            <BasicDateTimePicker
                                className="mt-0"
                                value={endDate}
                                onChange={value => {
                                    console.log('endDate', endDate);
                                    console.log(value);
                                    paramsUpdate('endDate', value);
                                }}
                                start={startDate}
                                label={'申請日期(迄)'}
                            />
                        </li>
                        <li>
                            <ButtonQuery
                                onClick={() => {
                                    getQryLogList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryLogList();
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
                        <Table header={columns} data={logList} getRowId={row => row.id} />
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

export default observer(History);
