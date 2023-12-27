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
import { addCommas } from '@helper';
import EditUserModal from './components/EditUserModal.js';
import UserInfoModal from './components/UserInfoModal.js';
import CreateUserModal from './components/CreateUserModal.js';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { TextField } from '@mui/material';
import { runInAction } from 'mobx';
import { pGroupText } from './constant/userList.js';

const User = () => {
    const {
        UserStore: {
            getQryUserList,
            userList,
            queryTime,
            updateData,
            reset,
            params,
            paramsUpdate,
            userData,
            getQryAgentList,
            resetUserData,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
            allowTypeOptions,
        },
        LoginStore: { traderInfo },
    } = useStore();
    const { userID, allowType } = params;
    const columns = [
        {
            field: 'userID',
            headerName: '契約編號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'userName',
            headerName: '契約名稱',
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
        {
            field: 'pGroup',
            headerName: '權限群組',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 150,
            flex: 1,
            renderCell: params => {
                return <p>{pGroupText.filter(item => item.value === params.row.pGroup).map(item => item.text)}</p>;
            },
        },
        {
            field: 'tseQuota',
            headerName: '上市額度',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 150,
            flex: 1,
            renderCell: params => <p>{addCommas(params.row.tseQuota)}</p>,
        },
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
            field: 'unit',
            headerName: '使用單位',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                if (params.row.unit === 1) {
                    return <p className="text-primary">資訊技術部</p>;
                } else if (params.row.unit === 0) {
                    return <p className="text-primary">信託部</p>;
                } else {
                    return <p></p>;
                }
            },
        },
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
            getQryUserList();
        }
    };
    useEffect(() => {
        resetUserData();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            reset();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        traderInfo();
        getQryUserList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <Layout title={'契約編號維護'}>
                <div className="d-flex justify-content-between">
                    <ul className="d-flex align-items-center">
                        <li className="me-3">
                            <TextField
                                id="outlined-basic"
                                label="契約編號"
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
                                    getQryUserList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryUserList();
                                }}
                            />
                        </li>
                    </ul>
                    {/* {sessionStorage.getItem('loginUnit') === '1' && ( */}
                    <ButtonCreate
                        onClick={e => {
                            runInAction(() => {
                                e.preventDefault();
                                resetUserData();
                                updateData('createUserModalVisible', true);
                                updateData('userAFlag', 'C');
                            });
                        }}
                    />
                    {/* )} */}
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
                            data={userList}
                            getRowId={row => row.userID}
                            onRowClick={params => {
                                runInAction(() => {
                                    updateData('userAFlag', 'U');
                                    updateData('userData', {
                                        ...params.row,
                                    });
                                    updateData('editUserModalVisible', true);
                                });
                            }}
                        />
                    ) : (
                        <CompleteInfo loadingFail={loadingFail} msg={msg} />
                    )}
                </section>
            </Layout>
            <EditUserModal />
            <UserInfoModal />
            <CreateUserModal />
        </PersistentDrawer>
    );
};

export default observer(User);
