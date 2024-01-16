import React from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IdleTimer from '@components/IdleTimer';

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
    const idleTime = sessionStorage.getItem('idleTime');
    const navigate = useNavigate();
    const handleTimeout = () => {
        // 在這裡處理超時的操作，例如將使用者導向登入頁面
        console.log('User session timed out. Redirecting to login.');

        sessionStorage.clear();
        navigate('/', { replace: true });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IdleTimer onTimeout={handleTimeout} idleTime={idleTime} />
            <h2 className="mb-3">{title}</h2>
            <section className="bg-white p-3 border-top border-3 border-primary rounded ">{children}</section>
        </ThemeProvider>
    );
};

export default observer(Layout);
