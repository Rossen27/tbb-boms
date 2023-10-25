import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Layout from '@containers/Layout';
import { PersistentDrawer, Loading, CompleteInfo, ButtonCreate, Table, ButtonExport } from '@components';
import { addCommas, removeNonNumeric } from '@helper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextField } from '@mui/material';
import EditAdminModal from './components/EditAdminModal';
import CreateAdminModal from './components/CreateAdminModal';
import AdminInfoModal from './components/AdminInfoModal';
import { runInAction } from 'mobx';
// import ExcelJS from 'exceljs';

const Admin = () => {
    const {
        AdminStore: {
            getQryAdminList,
            adminList,
            queryTime,
            updateData,
            resetAdminData,
            reset,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
        },
        LoginStore: { userInfo },
    } = useStore();
    // const { userID, allowType } = params;
    const columns = [
        {
            field: 'userID',
            headerName: '管理員代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'userName',
            headerName: '管理員名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
            sortable: false,
        },
        {
            field: 'adid',
            headerName: 'AD帳號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
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
                }
            },
        },
    ];
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            userInfo();
            getQryAdminList();
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
        userInfo();
        getQryAdminList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <div>
                <Layout title={'管理員資料維護'}>
                    <div className="d-flex justify-content-end">
                        <ButtonCreate
                            onClick={e => {
                                runInAction(() => {
                                    e.preventDefault();
                                    resetAdminData();
                                    updateData('createAdminModalVisible', true);
                                    updateData('adminAFlag', 'C');
                                });
                            }}
                        />
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
                                data={adminList}
                                getRowId={row => row.userID}
                                onRowClick={params => {
                                    updateData('adminData', {
                                        ...params.row,
                                    });
                                    updateData('adminAFlag', 'U');
                                    updateData('editAdminModalVisible', true);
                                }}
                            />
                        ) : (
                            <CompleteInfo loadingFail={loadingFail} msg={msg} />
                        )}
                    </section>
                </Layout>
                <EditAdminModal />
                <AdminInfoModal />
                <CreateAdminModal />
            </div>
        </PersistentDrawer>
    );
};

export default observer(Admin);
