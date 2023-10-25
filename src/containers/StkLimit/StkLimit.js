import React, { useEffect } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Layout from '@containers/Layout';
import {
    PersistentDrawer,
    Loading,
    CompleteInfo,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    Table,
    CustomDatePicker,
    ButtonExport,
} from '@components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { limTypeText } from './constant/stkLimit';
import { runInAction } from 'mobx';
import EditStkLimModal from './components/EditStkLimModal';
import StkLimInfoModal from './components/StkLimInfoModal';
// import ExcelJS from 'exceljs';

const StkLimit = () => {
    const {
        StkLimitStore: {
            getQryStkLimList,
            stkLimitList,
            queryTime,
            updateData,
            reset,
            updateComplete,
            isLoading,
            loadingFail,
            msg,
            params,
            paramsUpdate,
        },
        LoginStore: { userInfo },
    } = useStore();
    const { startDate, endDate } = params;
    const columns = [
        {
            field: 'lim_date',
            headerName: '額度日期',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'accId',
            headerName: '交易員代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            flex: 1,
            sortable: false,
        },
        {
            field: 'lim_type',
            headerName: '上市櫃',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            minWidth: 100,
            flex: 1,
            renderCell: params => <p>{limTypeText[params.row.lim_type].text}</p>,
        },
        {
            field: 'lim_val',
            headerName: '操作限額(元)',
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
            userInfo();
            getQryStkLimList();
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
        getQryStkLimList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <div>
                <Layout title={'可下單額度維護'}>
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
                                    getQryStkLimList();
                                }}
                            />
                        </li>
                        <li>
                            <ButtonReset
                                onClick={() => {
                                    reset();
                                    getQryStkLimList();
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
                        {isLoading ? (
                            <Loading isLoading={isLoading} />
                        ) : !updateComplete ? (
                            <Table
                                header={columns}
                                data={stkLimitList}
                                getRowId={row => row.lim_date + row.accId + row.lim_type}
                                onRowClick={params => {
                                    updateData('stkLimitData', {
                                        ...params.row,
                                    });
                                    updateData('stkLimAFlag', 'U');
                                    updateData('editStkLimModalVisible', true);
                                }}
                            />
                        ) : (
                            <CompleteInfo loadingFail={loadingFail} msg={msg} />
                        )}
                    </section>
                </Layout>
                <EditStkLimModal />
                <StkLimInfoModal />
            </div>
        </PersistentDrawer>
    );
};

export default observer(StkLimit);
