import React from 'react';
import { ModalEdit, Table } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/traderList';
const CreateAgentModal = () => {
    const {
        TraderListStore: {
            createAgentModalVisible,
            closeCreateAgentModal,
            updateData,
            agentData,
            dAgentData,
            assignedAgentList,
            unassignedAgentList,
            resetAgentData,
            createAgentDisabled,
        },
    } = useStore();

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
            headerName: '契約編號名稱',
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
                        e.preventDefault();
                        closeCreateAgentModal();
                        updateData('agentInfoModalVisible', true);
                        updateData('agentAFlag', 'D');
                        dAgentData.userID = params.row.userID;
                        dAgentData.userName = params.row.userName;
                        updateData('dAgentData', dAgentData);
                    }}
                    variant="outlined"
                    sx={[btnStyle.btn, btnStyle.btnDelete]}
                >
                    刪除
                </Button>
            ),
        },
    ];
    if (removeSpace(agentData.userID)) {
        updateData('createAgentDisabled', false);
    } else {
        updateData('createAgentDisabled', true);
    }
    return (
        <ModalEdit
            open={createAgentModalVisible}
            onClose={e => {
                e.preventDefault();
                closeCreateAgentModal();
                resetAgentData();
            }}
            title={'代理人設定'}
        >
            <form action="">
                <section>
                    <Table header={columns} data={assignedAgentList} getRowId={row => row.userID} />
                </section>
                <ul className="d-flex align-items-center m-5">
                    <li className="col-6">
                        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                            <InputLabel id="demo-controlled-open-select-label">代理人</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={agentData.userID}
                                label="代理人"
                                displayEmpty
                                onChange={e => {
                                    runInAction(() => {
                                        agentData.userID = e.target.value;
                                        agentData.userName = unassignedAgentList.find(
                                            item => item.userID === e.target.value
                                        ).userName;
                                        updateData('agentData', agentData);
                                    });
                                }}
                            >
                                {unassignedAgentList.map(({ userID, userName }, index) => {
                                    return (
                                        <MenuItem key={`agentOptions ${index}`} value={userID}>
                                            {userName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </li>
                    <li className="col-3">
                        <Button
                            onClick={() => {
                                closeCreateAgentModal();
                                updateData('editTraderModalVisible', true);
                                resetAgentData();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li className="col-3">
                        <Button
                            onClick={() => {
                                closeCreateAgentModal();
                                updateData('agentInfoModalVisible', true);
                                updateData('agentAFlag', 'C');
                            }}
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            variant="contained"
                            disabled={createAgentDisabled}
                        >
                            新增
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateAgentModal);
