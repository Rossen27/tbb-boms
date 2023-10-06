import React from 'react';
import { ModalEdit, Table } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace, removeNonNumeric } from '@helper';
import { Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/broker';
const CreateManagerModal = () => {
    const {
        BrokerStore: {
            createManagerModalVisible,
            closeCreateManagerModal,
            updateData,
            managerData,
            dManagerData,
            assignedAgentList,
            unassignedAgentList,
            resetManagerData,
            createManagerDisabled,
            managerAFlag,
        },
    } = useStore();

    const columns = [
        {
            field: 'userID',
            headerName: '經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'userName',
            headerName: '經理人名稱',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
        },
        {
            field: 'cancelBtn',
            headerName: '編輯',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 140,
            flex: 1,
            sortable: false,
            renderCell: params => (
                <Button
                    onClick={e => {
                        runInAction(() => {
                            e.preventDefault();
                            closeCreateManagerModal();
                            updateData('managerInfoModalVisible', true);
                            updateData('managerAFlag', 'D');
                            dManagerData.userID = params.row.userID;
                            dManagerData.userName = params.row.userName;
                            updateData('dManagerData', dManagerData);
                        });
                    }}
                    variant="outlined"
                    sx={[btnStyle.btn, btnStyle.btnDelete]}
                >
                    刪除
                </Button>
            ),
        },
    ];
    if (removeSpace(managerData.userID)) {
        updateData('createManagerDisabled', false);
    } else {
        updateData('createManagerDisabled', true);
    }
    return (
        <ModalEdit
            open={createManagerModalVisible}
            onClose={e => {
                e.preventDefault();
                closeCreateManagerModal();
                resetManagerData();
            }}
            title={'經理人設定'}
        >
            <form>
                <section>
                    <Table header={columns} data={assignedAgentList} getRowId={row => row.userID} />
                </section>
                <ul className="d-flex align-items-center m-5">
                    <li>
                        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                            <InputLabel id="demo-controlled-open-select-label">代理人</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={managerData.userID}
                                label="代理人"
                                displayEmpty
                                onChange={e => {
                                    runInAction(() => {
                                        managerData.userID = e.target.value;
                                        managerData.userName = unassignedAgentList.find(
                                            item => item.userID === e.target.value
                                        ).userName;
                                        updateData('managerData', managerData);
                                    });
                                }}
                            >
                                {unassignedAgentList.map(({ userID, userName }, index) => {
                                    return (
                                        <MenuItem key={`brokerManagerOptions ${index}`} value={userID}>
                                            {userName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </li>
                    <li className="ms-auto">
                        <Button
                            onClick={() => {
                                closeCreateManagerModal();
                                updateData('editBrokerModalVisible', true);
                                resetManagerData();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li className="ms-3">
                        <Button
                            onClick={() => {
                                closeCreateManagerModal();
                                updateData('managerInfoModalVisible', true);
                                updateData('managerAFlag', 'C');
                            }}
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            disabled={createManagerDisabled}
                            variant="contained"
                        >
                            新增
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateManagerModal);
