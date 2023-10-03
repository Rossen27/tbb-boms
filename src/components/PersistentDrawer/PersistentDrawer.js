import React, { useState } from 'react';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base';
import {
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BalanceIcon from '@mui/icons-material/Balance';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: '#ff8000',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const PersistentDrawer = ({ children, ...restProps }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const {
        AuthStore: { login, logout },
    } = useStore();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className="d-flex" {...restProps}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className={`d-flex ${open ? 'justify-content-end' : 'justify-content-between'}`}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ul className="d-flex justify-content-between align-items-center">
                        <li className="mx-1">
                            {`${localStorage.getItem('loginUserId')}${localStorage.getItem('loginUserName')}`}
                            ，你好
                        </li>
                        {/* <li className="mx-1">
                            <button
                                className="btn text-white btn-info rounded-pill"
                                onClick={async e => {
                                    e.preventDefault();
                                    await login();
                                    getQryLendDetail();
                                }}
                            >
                                登入
                            </button>
                        </li> */}
                        <li className="mx-1">
                            <button
                                className="btn text-white btn-dark rounded-pill"
                                onClick={async () => {
                                    logout();
                                    await navigate('/', { replace: true });
                                    location.reload();
                                }}
                            >
                                登出
                            </button>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={() => open && setOpen(false)}
            >
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#2D353C',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)}
                >
                    <DrawerHeader>
                        <h1 className="h4">
                            台灣中小企業銀行
                            <p className="h5 mt-2">管理介面</p>
                        </h1>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <ChevronLeftIcon sx={{ color: 'white' }} />
                            ) : (
                                <ChevronRightIcon sx={{ color: 'white' }} />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className="text-white">
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00201' ? ( */}
                        <ListItem component={Link} to="/UserList" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <PeopleAltIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="經理人登入系統基本資料檔維護" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00101' ? ( */}
                        <ListItem component={Link} to="/Admin" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="管理員資料維護" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00301' ? ( */}
                        <ListItem component={Link} to="/Broker" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <AssessmentIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="可下單券商資料維護" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00401' ? ( */}
                        <ListItem component={Link} to="/Stock" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <BalanceIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="可交易股票維護" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => { */}
                        {/* return id === '00601' ? ( */}
                        {/* <ListItem key={`idList${index}`} button component={Link} to="/Version">
                            <ListItemIcon>
                                <ToggleOnIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="交易介面程式版本資料維護" />
                        </ListItem> */}
                        {/* ) : ( */}
                        {/* '' */}
                        {/* ); */}
                        {/* })} */}
                        {/* {JSON.parse(localStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00601' ? ( */}
                        <ListItem component={Link} to="/History" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <HistoryIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="異動修改紀錄" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                    </List>
                </Drawer>
            </ClickAwayListener>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </div>
    );
};

export default observer(PersistentDrawer);
