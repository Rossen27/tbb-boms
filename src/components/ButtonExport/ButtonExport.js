import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(() => ({
    color: 'white',
    background: 'url(images/icon_excel.png) 50%  50% /20px no-repeat',
    backgroundColor: '#2BC48A',
    '&:hover': {
        backgroundColor: '#099962',
    },
    '&:disabled': { backgroundColor: '#CCCCCC' },
}));
const ButtonExport = ({ onClick, data }) => {
    return (
        <ColorButton
            variant="contained"
            sx={{ borderRadius: '50%', minWidth: 0, width: 40, height: 40, p: 0, ml: 1 }}
            onClick={onClick}
            disabled={data.length === 0}
        />
    );
};

export default ButtonExport;
