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
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import GradingIcon from '@mui/icons-material/Grading';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EditAccModal from '../../containers/Login/components/EditAccModal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { runInAction } from 'mobx';

const drawerWidth = 280;

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
        LoginStore: { closeEditAccModal, editAccModalVisible, updateData },
    } = useStore();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open2 = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            {`${sessionStorage.getItem('loginTraderID')}${sessionStorage.getItem('loginTraderName')}`}
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
                        <li>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>
                                        {sessionStorage.getItem('loginTraderID').split('')[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open2}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem
                                    onClick={e => {
                                        runInAction(() => {
                                            e.preventDefault();
                                            updateData('editAccModalVisible', true);
                                        });
                                    }}
                                >
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem
                                    onClick={async () => {
                                        logout();
                                        await navigate('/', { replace: true });
                                        location.reload();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
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
                        <ListItem component={Link} to="/User" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <ListAltIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="契約編號查詢" />
                        </ListItem>
                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => {
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
                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => {
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
                        <ListItem component={Link} to="/StkLimit" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <CurrencyExchangeIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="可下單額度維護" />
                        </ListItem>
                        <ListItem component={Link} to="/StkDeposit" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <MoveToInboxIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="契約庫存資料維護查詢" />
                        </ListItem>
                        <ListItem component={Link} to="/Order" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <RequestPageIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="委託交易轉檔資料查詢" />
                        </ListItem>
                        <ListItem component={Link} to="/DealOrder" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <GradingIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="成交轉檔資料查詢" />
                        </ListItem>

                        <ListItem component={Link} to="/TradeReport" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <ReceiptLongIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="券商交易成交檔案紀錄查詢" />
                        </ListItem>
                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00201' ? ( */}
                        <ListItem component={Link} to="/TraderList" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <PeopleAltIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="經理人登入系統基本資料檔維護" />
                        </ListItem>
                        {/* ) : (
                                ''
                            );
                        })} */}
                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => {
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

                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => { */}
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
                        {/* {JSON.parse(sessionStorage.getItem('loginAuth')).map(({ id }, index) => {
                            return id === '00601' ? ( */}
                        <ListItem component={Link} to="/History" sx={{ color: 'white' }}>
                            <ListItemIcon>
                                <HistoryIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="異動修改紀錄查詢" />
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
                <EditAccModal />
                {children}
            </Main>
        </div>
    );
};

export default observer(PersistentDrawer);
