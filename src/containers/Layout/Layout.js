import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: '#636363',
                    backgroundColor: '#EDF4F8',
                },
            },
        },
    },
});
const Layout = ({ title, children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <h2 className="mb-3">{title}</h2>
            <section className="bg-white p-3 border-top border-3 border-primary rounded ">{children}</section>
        </ThemeProvider>
    );
};

export default Layout;
