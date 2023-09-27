import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
const SelectInput = ({ options, selectVal, onChange }) => {
    return (
        <FormControl sx={{ m: 1, pr: 2 }} size="small" className="w-100">
            <Select value={selectVal} displayEmpty inputProps={{ 'aria-label': 'Without label' }} onChange={onChange}>
                {Object.entries(options).map(([value, label], index) => {
                    return (
                        <MenuItem key={`keyOptions ${index}`} value={value}>
                            {label}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default observer(SelectInput);
