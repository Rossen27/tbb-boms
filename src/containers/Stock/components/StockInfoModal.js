import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { btnStyle } from '../constant/stock';
const StockInfoModal = () => {
    const {
        StockStore: { stockInfoModalVisible, closeStockInfoModal, updateData, payoffModalData, updateRepayment },
    } = useStore();

    const [isClicked, setIsClicked] = useState(true);
    return (
        <ModalEdit open={stockInfoModalVisible} onClose={closeStockInfoModal} title={'確認新增可交易股票資料'}>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    closeStockInfoModal();
                    if (isClicked) {
                        setIsClicked(false);
                        // updateRepayment();
                        setTimeout(() => {
                            setIsClicked(true);
                        }, 3000);
                    }
                }}
            >
                <h4 className="title fw-bolder text-center lh-base mb-4">12345</h4>

                <div className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            updateData('createStockModalVisible', true);
                            closeStockInfoModal();
                        }}
                        variant="outlined"
                        sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCancel]}
                    >
                        上一步
                    </Button>
                    <Button type="submit" variant="contained" sx={[btnStyle.btn, btnStyle.btn_md, btnStyle.btnCreate]}>
                        確認變更
                    </Button>
                </div>
            </form>
        </ModalEdit>
    );
};

export default observer(StockInfoModal);
