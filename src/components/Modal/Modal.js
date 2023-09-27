import React, { useState } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const ModalEdit = ({ children, title, onClose, ...restProps }) => {
    // const {
    //     // LoanDetailStore: { editLoanModalVisible, updateData, closeEditLoanModal },
    // } = useStore();

    return (
        <Dialog {...restProps} fullWidth maxWidth="sm">
            <DialogTitle variant="h6" className="text-white bg-primary ps-5 py-2">
                {title}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 4,
                            color: theme => theme.palette.grey[200],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};

export default observer(ModalEdit);
