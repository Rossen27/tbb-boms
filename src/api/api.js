import { formPost, get, getBTrade, post } from './restAPI';
import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'http://10.107.6.140:8080/',
});
/** -------------------------- 會員 -------------------------- */
/* 會員登入 [POST] */
export const callLoginUser = postData => request.post('/tbbManager/login', postData);

/* getTraderInfo 客戶資訊 [GET] */
export const getTraderInfo = params => get('/tbbManager/manager/getTraderInfo', params);

/* updatePassword 客戶密碼維護 [POST] */
export const updateUserPassword = postData => post('/tbbManager/manager/updatePassword', postData);

/* getIdleTime 閒置時間查詢 */
export const getIdleTime = params => get('/tbbManager/getIdleTime', params);

/* ---------------------------經理人/契約編號共用 -------------------------   */

/*  optionQuery 下拉選單查詢 [GET] */
export const getManagerOptions = params => get('/tbbManager/manager/optionQuery', params);

/* ---------------------------經理人基本資料維護 -------------------------   */

/*  getTraderList 查詢經理人清單 [GET] */
export const queryTraderList = params => get('/tbbManager/manager/getTraderList', params);

/*  updateTrader 維護經理人清單 [GET] */
export const updateTrader = postData => post('/tbbManager/manager/updateTrader', postData);

/*  getAgentList 查詢代理人清單 [GET] */
export const queryAgentList = params => get('/tbbManager/manager/getAgentList', params);

/*  updateAgent 維護代理人  [POST] */
export const updateAgent = postData => post('/tbbManager/manager/updateAgent', postData);

/* ---------------------------管理員維護 -------------------------   */

/*  getAdminList 查詢管理人清單 [GET] */
export const queryAdminList = params => get('/tbbManager/manager/getAdminList', params);

/*  updateAdmin 維護代理人  [POST] */
export const updateAdmin = postData => post('/tbbManager/manager/updateAdmin', postData);

/* ---------------------------契約編號 -------------------------   */

/*  getUserList 查詢契約編號清單 [GET] */
export const queryUserList = params => get('/tbbManager/manager/getUserList', params);

/* updateUser 維護契約編號  [POST] */
export const updateUser = postData => post('/tbbManager/manager/updateUser', postData);

/* ---------------------------可下單券商資料維護 -------------------------  */

/*  optionQuery 下拉選單查詢 [GET] */
export const getBrokerOptions = params => get('/tbbManager/broker/optionQuery', params);

/* getBrokerList 查詢券商清單 [GET] */
export const queryBrokerList = params => get('/tbbManager/broker/getBrokerList', params);

/* updateBroker 維護券商 [POST] */
export const updateBroker = postData => post('/tbbManager/broker/updateBroker', postData);

/* getStockList 查詢可交易股票清單 [GET] */
export const queryBrokerManager = params => get('/tbbManager/broker/getManagerList', params);

/* ---------------------------可交易股票資料維護 -------------------------  */

/* getStockAllowList 查詢可交易股票清單 [GET] */
export const queryStockAllowList = params => get('/tbbManager/stockAllow/getStockAllowList', params);

/*  optionQuery 下拉選單查詢 [GET] */
export const getStockAllowOptions = params => get('/tbbManager/stockAllow/optionQuery', params);

/* updateStockAllow 維護可交易股票 [POST] */
export const updateStockAllow = postData => post('/tbbManager/stockAllow/updateStockAllow', postData);

/*  getSyncStkAllow 立即同步BTrade [GET] */
export const getSyncStkAllow = params => getBTrade('/BTrade/action?funcName=reLoadAllowStockList', params);

/* ---------------------------可下單額度維護 -------------------------  */

/* getStkLimitList 查詢可下單額度清單 [GET] */
export const queryStockLimitList = params => get('/tbbManager/stkLimit/getStkLimitList', params);

/* updateStkLimit 維護可下單額度 [POST] */
export const updateStockLimit = postData => post('/tbbManager/stkLimit/updateStkLimit', postData);

/* ---------------------------異動記錄清單 -------------------------  */

/* getManageToolLogList 查詢異動記錄清單 [GET] */
export const queryLogList = params => get('/tbbManager/manager/getManageToolLogList', params);

/* ---------------------------委託交易轉檔 -------------------------  */

/* getOrderTransactionList 查詢委託交易轉檔資料 [GET] */
export const queryOrderTransactionList = params => get('/tbbManager/orderTransaction/getOrderTransactionList', params);

/* ---------------------------成交轉檔資料 -------------------------  */

/* getTradeTransactionList 查詢成交轉檔資料 [GET] */
export const queryTradeTransactionList = params => get('/tbbManager/tradeTransaction/getTradeTransactionList', params);

/* ---------------------------契約庫存資料 -------------------------  */

/* getStockDepositList 查詢契約庫存資料 [GET] */
export const queryStockDepositList = params => get('/tbbManager/stockDeposit/getStockDepositList', params);

/* updateStockDeposit 維護交易庫存數量 [POST] */
export const updateStockDeposit = postData => post('/tbbManager/stockDeposit/updateStockDeposit', postData);

/* ---------------------------券商交易成交檔案記錄 -------------------------  */

/* getTradeReportList 查詢券商交易成交檔案記錄 [GET] */
export const queryTradeReportList = params => get('/tbbManager/tradeReport/getTradeReportList', params);

/* ---------------------------排程管理 -------------------------  */

/* getWorkList 查詢工作清單 [GET] */
export const queryWorkList = params => get('/tbbManager/Scheduled/getWorkList', params);

/* updateWork 維護排程時間 [POST] */
export const updateWork = postData => post('/tbbManager/Scheduled/updateWork', postData);

/* executeSync 手動執行排成 [POST] */
export const execSync = postData => post('/tbbManager/Scheduled/executeSync', postData);

/* ---------------------------文件處理-------------------------  */

/* uploadFile 上傳檔案 [GET] */
export const uploadFile = postData => formPost('/tbbManager/File/uploadFile', postData);
