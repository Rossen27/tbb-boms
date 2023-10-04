import React from 'react';
import { ModalEdit, Table } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const CreateAgentModal = () => {
    const {
        UserListStore: {
            createAgentModalVisible,
            closeCreateAgentModal,
            updateData,
            agentData,
            assignedAgentList,
            unassignedAgentList,
            resetAgentData,
            keyOptions,
        },
    } = useStore();

    const columns = [
        {
            field: 'accID',
            headerName: '代理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'accName',
            headerName: '代理人名稱',
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
                        agentData.accID = params.row.accID;
                        agentData.accName = params.row.accName;
                        updateData('agentData', agentData);
                    }}
                    variant="outlined"
                    sx={[btnStyle.btn, btnStyle.btnDelete]}
                >
                    刪除
                </Button>
            ),
        },
    ];
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
                    <Table header={columns} data={assignedAgentList} getRowId={row => row.accID} />
                </section>
                <ul className="d-flex align-items-center m-5">
                    <li className="col-6">
                        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                            <InputLabel id="demo-controlled-open-select-label">代理人</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={agentData.accID}
                                label="代理人"
                                displayEmpty
                                onChange={e => {
                                    runInAction(() => {
                                        agentData.accID = e.target.value;
                                        agentData.accName = unassignedAgentList.find(
                                            item => item.accID === e.target.value
                                        ).accName;
                                        updateData('agentData', agentData);
                                    });
                                }}
                            >
                                {unassignedAgentList.map(({ accID, accName }, index) => {
                                    return (
                                        <MenuItem key={`agentOptions ${index}`} value={accID}>
                                            {accName}
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
                                updateData('editUserModalVisible', true);
                                resetAgentData();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                            className=""
                        >
                            取消
                        </Button>
                    </li>
                    <li className="col-3">
                        <Button
                            onClick={() => {
                                closeCreateAgentModal();
                                updateData('agentInfoModalVisible', true);
                            }}
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
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
