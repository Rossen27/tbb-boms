import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/traderList';
const EditTraderModal = () => {
    const {
        TraderListStore: {
            editTraderModalVisible,
            closeEditTraderModal,
            updateData,
            userAFlag,
            traderData,
            getQryAgentList,
            updateTraderData,
            agentParams,
        },
    } = useStore();
    return (
        <ModalEdit open={editTraderModalVisible} onClose={closeEditTraderModal} title={'編輯經理人基本資料'}>
            <form>
                <div className="d-flex align-items-baseline mb-4">
                    <label htmlFor="traderID" className="col-sm-2 col-form-label fs-5">
                        經理人代號
                    </label>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            disabled
                            value={traderData.traderID}
                            id="traderID"
                        />
                    </div>
                    {/* 重設密碼 */}
                    {sessionStorage.getItem('loginUnit') === '1' && (
                        <button
                            className="border rounded-pill border-primary p-1 bg-white border-2"
                            type="button"
                            onClick={async e => {
                                e.preventDefault();
                                const postData = {
                                    traderID: traderData.traderID,
                                    traderName: traderData.traderName,
                                    allowType: traderData.allowType,
                                    actionFlag: 'R',
                                };
                                updateData('editTraderModalVisible', false);
                                await updateTraderData(postData);
                            }}
                        >
                            重設密碼
                        </button>
                    )}
                </div>
                <div className="mb-4 row">
                    <label htmlFor="traderName" className="col-sm-2 col-form-label fs-5">
                        經理人名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={traderData.traderName}
                            id="traderName"
                            onChange={e => {
                                runInAction(() => {
                                    traderData.traderName = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                    </div>
                </div>
                {/* <div className="mb-4 row">
                    <label htmlFor="adid" className="col-sm-2 col-form-label fs-5">
                        AD帳號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="adid"
                            value={traderData.adid}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.adid = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                    </div>
                </div> */}
                {/* <div className="mb-4 row align-items-center">
                    <label htmlFor="pGroup" className="col-sm-2 col-form-label fs-5">
                        群組
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="short-term"
                            value={'T'}
                            checked={traderData.pGroup === 'T'}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.pGroup = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="short-term">
                            短投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="long-term"
                            value={'B'}
                            checked={traderData.pGroup === 'B'}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.pGroup = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="long-term">
                            長投
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="admin"
                            value={'S'}
                            checked={traderData.pGroup === 'S'}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.pGroup = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="admin">
                            管理
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="pGroup"
                            id="strategic"
                            value={'A'}
                            checked={traderData.pGroup === 'A'}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.pGroup = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="strategic">
                            策略
                        </label>
                    </div>
                </div> */}
                <div className="mb-4 row align-items-center border-bottom pb-5">
                    <label htmlFor="allowType" className="col-sm-2 col-form-label fs-5">
                        權限
                    </label>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="view"
                            value={0}
                            checked={parseInt(traderData.allowType) === 0}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.allowType = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="view">
                            檢視權限
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="trade"
                            value={1}
                            checked={parseInt(traderData.allowType) === 1}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.allowType = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="trade">
                            交易權限
                        </label>
                    </div>
                    <div className="form-check form-check-inline col-sm-2 me-0 mb-0">
                        <input
                            className="form-check-input fs-5"
                            type="radio"
                            name="allowType"
                            id="disable"
                            value={3}
                            checked={parseInt(traderData.allowType) === 3}
                            onChange={e => {
                                runInAction(() => {
                                    traderData.allowType = e.target.value;
                                    updateData('traderData', traderData);
                                });
                            }}
                        />
                        <label className="form-check-label fs-5" htmlFor="disable">
                            停用帳號
                        </label>
                    </div>
                </div>

                <ul className="d-flex justify-content-between align-items-center m-5">
                    <li>
                        <Button
                            onClick={() => {
                                closeEditTraderModal();
                                getQryAgentList(traderData.traderID);
                                updateData('createAgentModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                        >
                            代理人設定
                        </Button>
                    </li>
                    <li>
                        <div className="d-flex">
                            <Button
                                onClick={closeEditTraderModal}
                                variant="outlined"
                                sx={[btnStyle.btn, btnStyle.btnCancel]}
                            >
                                取消
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={[btnStyle.btn, btnStyle.btnUpdate]}
                                onClick={e => {
                                    e.preventDefault();
                                    if (userAFlag === 'U') {
                                        if (
                                            removeSpace(traderData.traderName) &&
                                            // removeSpace(traderData.adid) &&
                                            // traderData.pGroup &&
                                            traderData.allowType != null
                                        ) {
                                            updateData('applyDisabled', false);
                                        } else {
                                            updateData('applyDisabled', true);
                                        }
                                    }
                                    updateData('traderInfoModalVisible', true);
                                    closeEditTraderModal();
                                }}
                            >
                                更新資料
                            </Button>
                        </div>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditTraderModal);
