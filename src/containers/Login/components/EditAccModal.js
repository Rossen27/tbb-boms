import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { removeSpace } from '@helper';
import { Button } from '@mui/material';
import { runInAction } from 'mobx';
import { btnStyle } from '../constant/accModal';
import PasswordChecklist from 'react-password-checklist';
const EditAccModal = () => {
    const navigate = useNavigate();
    const {
        LoginStore: {
            updateData,
            traderID,
            traderName,
            closeEditAccModal,
            editAccModalVisible,
            newPsd,
            reset,
            updateUserPsd,
            applyDisabled,
        },
        AuthStore: { logout },
    } = useStore();
    const rules = [
        /[a-z]/, // 包含小寫字母
        /[A-Z]/, // 包含大寫字母
        /\d/, // 包含數字
        /[^A-Za-z0-9]/, // 包含特殊字符
    ];
    const [psd, setPsd] = useState('');
    const count = rules.reduce((accumulator, rule) => {
        if (rule.test(psd)) {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);
    return (
        <ModalEdit
            open={editAccModalVisible}
            onClose={e => {
                e.preventDefault();
                closeEditAccModal();
                reset({ newPsd: '' });
                setPsd('');
            }}
            title={'變更密碼'}
        >
            <form>
                <div className="mb-4 row">
                    <label htmlFor="traderName" className="col-sm-2 col-form-label fs-5">
                        經理人名稱
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control w-40 fs-5"
                            value={traderName}
                            id="traderName"
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="traderID" className="col-sm-2 col-form-label fs-5">
                        經理人代號
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="traderID"
                            value={traderID}
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="psd" className="col-sm-2 col-form-label fs-5">
                        變更密碼
                        <br></br>(四選三)
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control col-sm-4 w-40 fs-5"
                            id="psd"
                            value={psd}
                            onChange={e => {
                                runInAction(() => {
                                    const nPsd = e.target.value;
                                    setPsd(nPsd);
                                    updateData('password', psd);
                                });
                            }}
                        />

                        <PasswordChecklist
                            className="custom-password-checklist"
                            rules={['minLength', 'capital', 'lowercase', 'specialChar', 'number']}
                            minLength={8}
                            value={psd}
                            // valueAgain={passwordAgain}
                            messages={{
                                minLength: '長度為8位(必)',
                                capital: '包含英文大寫字元(選)',
                                lowercase: '包含英文小寫字元(選)',
                                specialChar: '包含特殊字元(選)',
                                number: '包含數字(選)',
                            }}
                            iconSize={10}
                        />
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="psd" className="col-sm-2 col-form-label fs-5">
                            再次輸入密碼
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control col-sm-4 w-40 fs-5"
                                id="psd2"
                                value={newPsd}
                                onChange={e => {
                                    runInAction(() => {
                                        const newPsd = e.target.value;
                                        updateData('newPsd', newPsd);
                                    });
                                }}
                            />
                            <PasswordChecklist
                                className="custom-password-checklist"
                                rules={['match']}
                                value={psd}
                                valueAgain={newPsd}
                                messages={{
                                    match: '密碼需相同',
                                }}
                                iconSize={10}
                            />
                        </div>
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center m-5">
                    <li>
                        <Button
                            onClick={e => {
                                e.preventDefault();
                                closeEditAccModal();
                                reset({ newPsd: '' });
                                setPsd('');
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
                            sx={[btnStyle.btn, btnStyle.btnUpdate]}
                            onClick={async e => {
                                e.preventDefault();
                                const postData = {
                                    password: psd,
                                };
                                updateData('applyDisabled', true);
                                const rtn = await updateUserPsd(postData);
                                if (rtn) {
                                    closeEditAccModal();
                                    logout();
                                    await navigate('/', { replace: true });
                                }
                                reset({ newPsd: '' });
                                setPsd('');
                            }}
                            disabled={
                                count < 3 || psd.length < 8 || psd !== newPsd || applyDisabled || psd.includes(' ')
                            }
                        >
                            更新資料
                        </Button>
                        <p className={`${psd.includes(' ') ? 'fs-5 text-danger text-center' : 'd-none'}`}>
                            密碼請勿包含空白
                        </p>
                    </li>
                </ul>
            </form>
        </ModalEdit>
    );
};

export default observer(EditAccModal);
