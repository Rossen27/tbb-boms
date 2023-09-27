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
    BasicDateTimePicker,
} from '@components';
import { addCommas, removeNonNumeric } from '@helper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextField } from '@mui/material';

// import ExcelJS from 'exceljs';

const History = () => {
    const {
        HistoryStore: {
            statusOptions,
            keyOptions,
            applyTypeOptions,
            repaymentAccountTypeOptions,
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
            field: 'repayMentDate',
            headerName: '異動時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 220,
            flex: 1,
            sortingOrder: ['asc', 'desc'],
            renderCell: params => (
                <div>
                    <p className="m-0">{params.row.repayMentDate}</p>
                    <p className={`m-0 ${params.row.status === '2' ? 'num-cancel' : 'num-normal'}`}>
                        申請書編號：{params.row.applicationNumber}
                    </p>
                </div>
            ),
        },
        {
            field: 'bhno',
            headerName: '異動功能',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'name',
            headerName: '異動說明',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'repayMentInterest',
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
                <Layout title={'異動修改紀錄'}>
                    <ul className="d-flex align-items-end">
                        <li>
                            <SelectInput
                                options={keyOptions}
                                selectVal={field}
                                onChange={e => {
                                    paramsUpdate('field', e.target.value);
                                }}
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
                                value={endDate}
                                onChange={value => {
                                    console.log(value);
                                    paramsUpdate('endDate', value);
                                }}
                                start={startDate}
                                label={'申請日期(迄)'}
                            />
                        </li>

                        {/*                            
                            <li>
                                <SelectMultiple
                                    title={'過濾權限'}
                                    options={statusOptions}
                                    onChange={value => paramsUpdate('repaymentAccountType', value)}
                                    selectArr={repaymentAccountType}
                                />
                            </li> */}
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

                    <div className="d-flex justify-content-end mt-2 align-items-center">
                        <p className="time">
                            <AccessTimeIcon sx={{ verticalAlign: 'bottom' }} />
                            查詢時間：{queryTime}
                        </p>
                    </div>
                    <section>
                        <Table header={columns} data={repaymentDetailList} />
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
