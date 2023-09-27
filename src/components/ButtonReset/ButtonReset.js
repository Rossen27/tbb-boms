import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
const ColorButton = styled(Button)(({ theme }) => ({
    color: '#717A8C',
    borderColor: '#717A8C',
    '&:hover': {
        backgroundColor: '#aaaaaa',
        borderColor: '#717A8C',
        color: '#fff',
    },
    '&:focus': {
        borderColor: '#717A8C',
    },
}));
const ButtonReset = ({ onClick }) => {
    return (
        <ColorButton variant="outlined" onClick={onClick} sx={{ m: 1 }}>
            重設
        </ColorButton>
    );
};

export default observer(ButtonReset);
