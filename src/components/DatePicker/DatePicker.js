import React from 'react';
// import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, TextField, ThemeProvider } from '@mui/material';
const CustomDatePicker = ({ date, onChange, start, label }) => {
    const theme = createTheme({
        components: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused': {
                        borderColor: 'red',
                    },
                },
                label: {
                    '&.Mui-focused': {
                        color: 'red',
                    },
                },
            },
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                <DatePicker
                    sx={{ m: 1 }}
                    label={label}
                    inputFormat="yyyy/MM/dd"
                    value={date}
                    onChange={onChange}
                    minDate={start}

                    // slots={{
                    //     textField: textFieldProps => (
                    //         <TextField size="small" {...textFieldProps} sx={{ width: '150px' }} />
                    //     ),
                    // }}
                />
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
