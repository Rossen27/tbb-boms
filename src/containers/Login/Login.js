import React, { useState, useEffect } from 'react';
import { useStore } from '@store';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logoSrc from '../../assets/images/logo512.png';

const Login = () => {
    const [isAccount, setIsAccount] = useState();
    const [isPsd, setIsPsd] = useState('');
    const [showPsd, setShowPsd] = useState(false);
    const [show, setShow] = useState(false);
    const {
        AuthStore: { login, msg },
        LoginStore: { traderInfo },
    } = useStore();

    const navigate = useNavigate();
    // useEffect(() => {
    //     login();
    // }, []);
    const { version } = require('../../../package.json');
    const handleClickShowPassword = () => {
        setShowPsd(isShowing => !isShowing);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    return (
        <div
            style={{
                background: 'no-repeat, linear-gradient(to bottom,  #ecbd97 0%,#ff8000 100%)',
                width: '100vw',
                height: '100vh',
            }}
        >
            <form
                sx={{ width: '100%', height: '100%' }}
                onSubmit={async e => {
                    e.preventDefault();
                    await login(isAccount, isPsd);
                    if (sessionStorage.getItem('loginCode') === '0') {
                        traderInfo();
                        navigate('/TraderList', { replace: true });
                    } else {
                        setShow(true);
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 500,
                        height: 480,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        margin: 'auto',
                        // padding: 3,
                        borderRadius: 5,
                        backgroundColor: 'white',
                    }}
                >
                    <Typography
                        variant="h1"
                        style={{
                            background: `url(${logoSrc}) no-repeat center`,
                            width: '600px',
                            height: '120px',
                            borderRadius: 0,
                        }}
                        sx={{
                            color: '#5A5A5A',
                            padding: 3,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 32,
                        }}
                    ></Typography>
                    <Typography
                        // variant="h5"
                        sx={{
                            color: '#5A5A5A',
                            padding: 3,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 26,
                        }}
                    >
                        OMS後台管理系統
                    </Typography>
                    <TextField
                        type={'text'}
                        sx={{ width: 400, margin: 'normal' }}
                        placeholder="登入帳號"
                        onChange={e => {
                            const accountValue = e.target.value;
                            setIsAccount(accountValue);
                        }}
                    />
                    <OutlinedInput
                        type={showPsd ? 'text' : 'password'}
                        sx={{ width: 400, margin: 'normal', marginTop: 3 }}
                        placeholder="登入密碼"
                        value={isPsd}
                        onChange={e => {
                            const psdValue = e.target.value;
                            setIsPsd(psdValue);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPsd ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Alert severity="error" className={show ? '' : 'd-none'}>
                        登入失敗，{msg}
                    </Alert>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: ' #ff8000',
                            width: 400,
                            height: 50,
                            borderRadius: 10,
                            marginTop: 3,
                            fontSize: 20,
                            ':hover': {
                                backgroundColor: ' #f0832d',
                            },
                        }}
                    >
                        登入
                    </Button>
                    <Typography
                        // variant="h5"
                        sx={{
                            color: '#4a4a4a',
                            textAlign: 'end',
                            paddingRight: 5,
                            paddingTop: 1,
                            fontSize: 8,
                            width: '100%',
                        }}
                    >
                        {version}
                    </Typography>
                </Box>
            </form>
        </div>
    );
};

export default observer(Login);
