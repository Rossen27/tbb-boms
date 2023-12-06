import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import { functionName } from './constant/history';
import { PersistentDrawer, SelectMultiple, ButtonQuery, ButtonReset, Table, BasicDateTimePicker } from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const History = () => {
    const {
        HistoryStore: { functionOptions, logList, queryTime, getQryLogList, reset, params, paramsUpdate },
        LoginStore: { traderInfo },
    } = useStore();
    const { startDate, endDate, functionId } = params;

    const columns = [
        {
            field: 'updDate',
            headerName: '異動時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            maxWidth: 300,
            flex: 1,
            sortingOrder: ['asc', 'desc'],
        },
        {
            field: 'functionId',
            headerName: '異動功能',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            maxWidth: 300,
            flex: 1,
            renderCell: params => <p>{functionName[params.row.functionId].text}</p>,
        },
        {
            field: 'description',
            headerName: '異動說明',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'left',
            minWidth: 220,
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
            maxWidth: 200,
            flex: 1,
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            traderInfo();
            getQryLogList();
        }
    };
    useEffect(() => {
        traderInfo();
        getQryLogList();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PersistentDrawer>
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
                            label={'異動日期(起)'}
                        />
                    </li>
                    <li>
                        <BasicDateTimePicker
                            className="mt-0"
                            value={endDate}
                            onChange={value => {
                                paramsUpdate('endDate', value);
                            }}
                            start={startDate}
                            label={'異動日期(迄)'}
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
        </PersistentDrawer>
    );
};

export default observer(History);
