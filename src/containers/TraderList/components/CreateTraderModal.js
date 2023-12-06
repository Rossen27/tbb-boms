import React from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/traderList';
const CreateTraderModal = () => {
    const {
        TraderListStore: {
            createTraderModalVisible,
            closeCreateTraderModal,
            updateData,
            traderData,
            cTraderID,
            cTraderName,
        },
    } = useStore();

    return (
        <ModalEdit
            open={createTraderModalVisible}
            onClose={() => {
                closeCreateTraderModal();
            }}
            title={'新增經理人基本資料'}
        >
            <form>
                <div className="mb-4 row">
                    <label htmlFor="traderID" className="col-sm-2 col-form-label fs-5">
                        經理人代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            required
                            value={cTraderID}
                            id="traderID"
                            onChange={e => {
                                runInAction(() => {
                                    const traderID = e.target.value;
                                    updateData('cTraderID', traderID);
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="traderName" className="col-sm-2 col-form-label fs-5">
                        經理人名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            id="traderName"
                            required
                            value={cTraderName}
                            onChange={e => {
                                runInAction(() => {
                                    const traderName = e.target.value;
                                    updateData('cTraderName', traderName);
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
                            value={cADID}
                            required
                            onChange={e => {
                                runInAction(() => {
                                    const adid = e.target.value;
                                    updateData('cADID', adid);
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
                            required
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
                            required
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
                <ul className="d-flex justify-content-center m-5">
                    {/* <li>
                        <Button
                            onClick={() => {
                                closeCreateTraderModal();
                                updateData('createAgentModalVisible', true);
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                        >
                            代理人設定
                        </Button>
                    </li> */}
                    <li>
                        <Button
                            onClick={() => {
                                closeCreateTraderModal();
                            }}
                            variant="outlined"
                            sx={[btnStyle.btn, btnStyle.btnCancel]}
                        >
                            取消
                        </Button>
                    </li>
                    <li>
                        <Button
                            type="button"
                            variant="contained"
                            sx={[btnStyle.btn, btnStyle.btnCreate]}
                            onClick={e => {
                                e.preventDefault();
                                if (
                                    removeSpace(cTraderID) &&
                                    removeSpace(cTraderName) &&
                                    // removeSpace(cADID) &&
                                    // traderData.pGroup &&
                                    traderData.allowType != null
                                ) {
                                    updateData('applyDisabled', false);
                                } else {
                                    updateData('applyDisabled', true);
                                }
                                updateData('traderInfoModalVisible', true);
                                closeCreateTraderModal();
                            }}
                        >
                            新增資料
                        </Button>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(CreateTraderModal);
