import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderColor: '#ff8000',
    backgroundColor: '#ff8000',
    '&:hover': {
        borderColor: '#ff8000',
        backgroundColor: '#f0832d',
    },
}));
const ButtonCreate = ({ onClick }) => {
    return (
        <ColorButton variant="contained" sx={{ m: 1 }} onClick={onClick}>
            <AddIcon sx={{ color: 'white' }} />
            新增
        </ColorButton>
    );
};

export default ButtonCreate;
