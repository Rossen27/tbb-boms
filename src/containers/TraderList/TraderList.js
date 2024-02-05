import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Layout from '@containers/Layout';
import {
    PersistentDrawer,
    Loading,
    CompleteInfo,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    Table,
} from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditTraderModal from './components/EditTraderModal';
import { TextField } from '@mui/material';
import TraderInfoModal from './components/TraderInfoModal';
import CreateTraderModal from './components/CreateTraderModal';
import CreateAgentModal from './components/CreateAgentModal';
import AgentInfoModal from './components/AgentInfoModal';
import { runInAction } from 'mobx';

const TraderList = () => {
    const {
        TraderListStore: {
            getQryTraderList,
            traderList,
            queryTime,
            updateData,
            reset,
            params,
            paramsUpdate,
            resetTraderData,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
            allowTypeOptions,
        },
        LoginStore: { traderInfo },
    } = useStore();
    const { traderID, allowType } = params;
    const columns = [
        {
            field: 'traderID',
            headerName: '經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'traderName',
            headerName: '經理人名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        // {
        //     field: 'adid',
        //     headerName: 'AD帳號',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 100,
        //     flex: 1,
        // },
        // {
        //     field: 'pGroup',
        //     headerName: '群組',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 150,
        //     flex: 1,
        //     renderCell: params => {
        //         return <p>{pGroupText.filter(item => item.value === params.row.pGroup).map(item => item.text)}</p>;
        //     },
        // },
        // {
        //     field: 'tseQuota',
        //     headerName: '上市額度',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 150,
        //     flex: 1,
        // },
        // {
        //     field: 'otcQuota',
        //     headerName: '上櫃額度',
        //     headerClassName: 'table-header',
        //     headerAlign: 'center',
        //     align: 'center',
        //     sortable: false,
        //     minWidth: 90,
        //     flex: 1,
        // },
        {
            field: 'allowType',
            headerName: '權限',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 120,
            flex: 1,
            renderCell: params => {
                if (params.row.allowType === 0) {
                    return <p className="text-primary">檢視</p>;
                } else if (params.row.allowType === 1) {
                    return <p className="border-3 border-bottom border-warning">交易</p>;
                } else if (params.row.allowType === 3) {
                    return <p className="p-1 bg-info rounded text-white">停用</p>;
                } else {
                    return <p></p>;
                }
            },
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            traderInfo();
            getQryTraderList();
        }
    };
    useEffect(() => {
        resetTraderData();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        traderInfo();
        getQryTraderList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <Layout title={'經理人登入系統基本資料維護'}>
                <div className="d-flex justify-content-between">
                    <ul className="d-flex align-items-center">
                        <li className="me-3">
                            <TextField
                                id="outlined-basic"
                                label="經理人代號"
                                variant="outlined"
                                size="small"
                                value={traderID}
                                onChange={e => {
                                    paramsUpdate('traderID', e.target.value);
                                }}
                                sx={{ width: '120px' }}
                            />
                        </li>
                        <li>
                            <SelectMultiple
                                title={'過濾權限'}
                                options={allowTypeOptions}
                                onChange={value => paramsUpdate('allowType', value)}
                                selectArr={allowType}
                            />
                        </li>
                        <li>
                            <ButtonQuery
                                onClick={() => {
                                    getQryTraderList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryTraderList();
                                }}
                            />
                        </li>
                    </ul>
                    {sessionStorage.getItem('loginUnit') === '1' && (
                        <ButtonCreate
                            onClick={e => {
                                runInAction(() => {
                                    e.preventDefault();
                                    resetTraderData();
                                    updateData('createTraderModalVisible', true);
                                    updateData('userAFlag', 'C');
                                });
                            }}
                        />
                    )}
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
                            data={traderList}
                            getRowId={row => row.traderID}
                            onRowClick={params => {
                                runInAction(() => {
                                    updateData('userAFlag', 'U');
                                    updateData('traderData', {
                                        ...params.row,
                                    });

                                    if (sessionStorage.getItem('loginUnit') === '1') {
                                        updateData('editTraderModalVisible', true);
                                    } else {
                                        if (sessionStorage.getItem('loginTraderID') === params.id) {
                                            updateData('editTraderModalVisible', true);
                                        }
                                    }
                                });
                            }}
                        />
                    ) : (
                        <CompleteInfo loadingFail={loadingFail} msg={msg} />
                    )}
                </section>
            </Layout>
            <EditTraderModal />
            <TraderInfoModal />
            <AgentInfoModal />
            <CreateTraderModal />
            <CreateAgentModal />
        </PersistentDrawer>
    );
};

export default observer(TraderList);
