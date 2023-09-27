import React from 'react';
import { ModalEdit, Table, SelectInput } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { addCommas, removeNonNumeric } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/userList';
const EditAgentModal = () => {
    const {
        UserListStore: {
            editAgentModalVisible,
            closeEditAgentModal,
            updateData,
            payoffModalData,
            repaymentDetailList,
            statusDisabled,
            field,
            keyOptions,
        },
    } = useStore();

    const columns = [
        {
            field: 'bhno',
            headerName: '經理人代號',
            headerClassName: 'table-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            flex: 1,
        },
        {
            field: 'name',
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
                    onClick={() => {
                        closeEditAgentModal();
                        updateData('agentInfoModalVisible', true);
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
        <ModalEdit open={editAgentModalVisible} onClose={closeEditAgentModal} title={'代理人設定'}>
            <form action="">
                <section>
                    <Table header={columns} data={repaymentDetailList} hideFooter={true} />
                </section>
                <ul className="d-flex align-items-center m-5">
                    <li className="col-6">
                        <SelectInput
                            options={keyOptions}
                            selectVal={field}
                            onChange={e => {
                                updateData('field', e.target.value);
                            }}
                        />
                    </li>
                    <li className="col-3">
                        <Button
                            onClick={() => {
                                closeEditAgentModal();
                                updateData('editUserModalVisible', true);
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
                                closeEditAgentModal();
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

export default observer(EditAgentModal);
