import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import Layout from '@containers/Layout';
import {
    PersistentDrawer,
    CustomDatePicker,
    SelectInput,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    Table,
    ButtonExport,
} from '@components';
import { addCommas, removeNonNumeric } from '@helper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextField } from '@mui/material';

import EditAdminModal from './components/EditAdminModal';
import CreateAdminModal from './components/CreateAdminModal';
import AdminInfoModal from './components/AdminInfoModal';

// import ExcelJS from 'exceljs';

const Admin = () => {
    const {
        AdminStore: {
            createAdminModalVisible,
            repaymentDetailList,
            totalNetPayAmount,
            totalRepayMentAmount,
            totalRepayMentInterest,
            queryTime,
            updateData,
            getQryRepaymentDetail,
            reset,
            params,
            paramsUpdate,
        },
    } = useStore();
    const { keyword, startDate, repaymentAccountType, status, applyType, endDate, field } = params;

    const columns = [
        {
            field: 'bhno',
            headerName: '管理員代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'name',
            headerName: '管理員名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
            sortable: false,
        },
        {
            field: 'repayMentInterest',
            headerName: 'AD帳號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'netPayAmount',
            headerName: '使用單位',
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
                <Layout title={'管理員資料維護'}>
                    <div className="d-flex justify-content-end">
                        <ButtonCreate
                            onClick={() => {
                                updateData('actions', 'Create');
                                updateData('createAdminModalVisible', true);
                                // getQryRepaymentDetail();
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
                        <Table
                            header={columns}
                            data={repaymentDetailList}
                            onRowClick={params => {
                                updateData('payoffModalData', {
                                    ...params.row,
                                });
                                updateData('actions', 'Update');
                                updateData('editAdminModalVisible', true);
                                if (parseInt(params.row.status) !== 3) {
                                    updateData('statusDisabled', true);
                                } else {
                                    updateData('statusDisabled', false);
                                }
                            }}
                        />
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
