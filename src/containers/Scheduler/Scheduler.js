import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import Layout from '@containers/Layout';
import { execStatusText, holidayFlagText, btnStyle } from './constant/scheduler';
import { format, parse } from 'date-fns';
import {
    PersistentDrawer,
    Loading,
    CompleteInfo,
    SelectMultiple,
    ButtonQuery,
    ButtonReset,
    ButtonCreate,
    ButtonExport,
    Table,
} from '@components';
import { Button } from '@mui/material';
import EditWorkTimeModal from './components/EditWorkTimeModal';
import WorkTimeInfoModal from './components/WorkTimeInfoModal';
import SchedulerInfoModal from './components/SchedulerInfoModal';
import CreateSchedulerModal from './components/CreateSchedulerModal';
import UploadFileModal from './components/UploadFileModal';
const Scheduler = () => {
    const {
        SchedulerStore: {
            updateData,
            workList,
            updateComplete,
            getQryWorkList,
            handleSchedule,
            loadingFail,
            isLoading,
            msg,
            execHandleDisabled,
            resetSchedulerData,
        },
    } = useStore();
    const columns = [
        {
            field: 'workName',
            headerName: '排程名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'execCMD',
            headerName: '執行指令',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'setTime',
            headerName: '作業時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
            // renderCell: params => {
            //     const timeFormat = [];
            //     for (const [index] of [...params.row.setTime].entries()) {
            //         if (index % 2 === 0) {
            //             timeFormat.push(params.row.setTime.slice(index, index + 2));
            //         }
            //     }
            //     const setTimeFormat = timeFormat.join(':');
            //     return <p>{setTimeFormat}</p>;
            // },
        },
        {
            field: 'nexecTime',
            headerName: '下次執行時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 180,
            flex: 1,
            sortable: false,
            // renderCell: params => {
            //     return (
            //         <p>{format(parse(params.row.nexecTime, 'yyyyMMddHHmmss', new Date()), 'yyyy/MM/dd HH:mm:ss')}</p>
            //     );
            // },
        },
        {
            field: 'lexecTime',
            headerName: '上次執行時間',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 180,
            flex: 1,
            sortable: false,
            // renderCell: params => {
            //     return (
            //         <p>{format(parse(params.row.lexecTime, 'yyyyMMddHHmmss', new Date()), 'yyyy/MM/dd HH:mm:ss')}</p>
            //     );
            // },
        },
        {
            field: 'execStatus',
            headerName: '上次執行是否成功',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
            renderCell: params => {
                return (
                    <p>{execStatusText.filter(item => item.value === params.row.execStatus).map(item => item.text)}</p>
                );
            },
        },
        {
            field: 'holidayFlag',
            headerName: '假日是否執行',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
            renderCell: params => {
                return (
                    <p>
                        {holidayFlagText.filter(item => item.value === params.row.holidayFlag).map(item => item.text)}
                    </p>
                );
            },
        },
        {
            field: 'execBtn',
            headerName: '手動執行',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
            renderCell: params => (
                <Button
                    disabled={execHandleDisabled}
                    sx={[btnStyle.btn]}
                    onClick={async e => {
                        e.preventDefault();
                        if (params.row.execCMD === 'UPLOAD') {
                            updateData('uploadFileModalVisible', true);
                        } else {
                            updateData('execHandleDisabled', true);
                            const postData = {
                                execCMD: params.row.execCMD,
                                workID: params.row.workID,
                            };
                            await handleSchedule(postData);
                        }
                    }}
                    variant="outlined"
                >
                    {params.row.execCMD === 'UPLOAD' ? '上傳' : '執行'}
                </Button>
            ),
        },
    ];

    const navigate = useNavigate();
    useEffect(() => {
        getQryWorkList();
        if (updateComplete) {
            setTimeout(() => {
                navigate(0);
            }, 3000);
        }
    }, [updateComplete]);
    return (
        <PersistentDrawer>
            <Layout title={'排程管理'}>
                <section className="d-flex justify-content-end">
                    {sessionStorage.getItem('loginUnit') === '1' && (
                        <ButtonCreate
                            onClick={e => {
                                runInAction(() => {
                                    e.preventDefault();
                                    resetSchedulerData();
                                    updateData('createSchedulerModalVisible', true);
                                    updateData('schedulerAFlag', 'C');
                                });
                            }}
                        />
                    )}
                </section>
                <section>
                    {isLoading ? (
                        <Loading isLoading={isLoading} />
                    ) : !updateComplete ? (
                        <Table
                            header={columns}
                            data={workList}
                            getRowId={row => row.workID}
                            onCellClick={params => {
                                runInAction(() => {
                                    // const timeFormat = [];
                                    // for (const [index] of [...params.row.setTime].entries()) {
                                    //     if (index % 2 === 0) {
                                    //         timeFormat.push(params.row.setTime.slice(index, index + 2));
                                    //     }
                                    // }
                                    // const setTimeFormat = timeFormat.join(':');
                                    // updateData('setTimeFormat', setTimeFormat);
                                    if (params.field !== 'execBtn') {
                                        updateData('editWorkTimeModalVisible', true);
                                        updateData('schedulerData', {
                                            ...params.row,
                                        });
                                    }
                                });
                            }}
                            // onRowClick={params => {
                            //     console.log(params.row);
                            //     runInAction(() => {
                            //         updateData('editWorkTimeModalVisible', true);
                            //         updateData('schedulerData', {
                            //             ...params.row,
                            //         });
                            //     });
                            // }}
                            hideFooter={true}
                        />
                    ) : (
                        <CompleteInfo loadingFail={loadingFail} msg={msg} />
                    )}
                </section>
            </Layout>
            <CreateSchedulerModal />
            <EditWorkTimeModal />
            <WorkTimeInfoModal />
            <SchedulerInfoModal />
            <UploadFileModal />
        </PersistentDrawer>
    );
};

export default observer(Scheduler);
