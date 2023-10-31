import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({ label, value, onChange, start }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DateTimePicker']} sx={{ m: 1, mt: 0 }}>
                <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    label={label}
                    value={value}
                    onChange={onChange}
                    minDate={start}
                    ampm={false}
                    slotProps={{ textField: { size: 'small' } }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
