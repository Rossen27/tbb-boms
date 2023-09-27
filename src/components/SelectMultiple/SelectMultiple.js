import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 180,
        },
    },
};

const SelectMultiple = ({ title, options, onChange, selectArr = [] }) => {
    const handleChange = event => {
        const {
            target: { value },
        } = event;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };
    return (
        <div>
            <FormControl sx={{ ms: 0, minWidth: 180 }} size="small">
                <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectArr}
                    onChange={handleChange}
                    displayEmpty
                    input={<OutlinedInput label={title} />}
                    renderValue={selected => selected.join(',')}
                    MenuProps={MenuProps}
                >
                    {Object.values(options).map((option, index) => (
                        <MenuItem key={title + index} value={option} sx={{ p: 0 }}>
                            <Checkbox checked={selectArr.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default observer(SelectMultiple);
