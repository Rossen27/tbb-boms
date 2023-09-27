import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderColor: '#80c0ff',
    backgroundColor: '#70a5da',
    '&:hover': {
        backgroundColor: '#80c0ff',
    },
}));
const ButtonQuery = ({ onClick }) => {
    return (
        <ColorButton variant="contained" sx={{ m: 1 }} onClick={onClick}>
            查詢
        </ColorButton>
    );
};

export default ButtonQuery;
