import { formPost, get, put, post } from './restAPI';
import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'http://10.107.6.140:8080/',
});
/** -------------------------- 會員 -------------------------- */
/** 會員登入 [POST]
 */
// export const callLoginUser = postData =>
//     request.post('/login', {
//         account: 'kunlung',
//         pwd: '111111',
//     });
export const callLdapLogin = postData => request.post('/ldapLogin', postData);
export const callLoginUser = postData => request.post('/login', postData);
export const callLoginTest = postData =>
    request.post('/SCLOAN090/login', {
        bid: '2',
        idno: 'A234567891',
        loginAccount: 'money',
    });
/** callGetCustomerInfo客戶收合資訊 [POST]
 */
export const callGetCustomerInfo = () => post('/SCLOAN090/customerInfo', {});

/** ---------------------------使用者基本資料維護 -------------------------   */
/*  optionQuery 下拉選單查詢 [GET]
 */
export const getManagerOptions = params => get('/manager/optionQuery', params);

/*  getUserList 查詢經理人清單 [GET]
 */
export const queryUserList = params => get('/manager/getUserList', params);

/* updateUser 維護經理人  [POST]
 */
export const updateUser = postData => post('/manager/updateUser', postData);

/*  getAgentList 查詢代理人清單 [GET]
 */
export const queryAgentList = params => get('/manager/getAgentList', params);

/*  updateAgent 維護代理人  [POST]
 */
export const updateAgent = postData => post('/manager/updateAgent', postData);

/*  getAdminList 查詢管理人清單 [GET] */
export const queryAdminList = params => get('/manager/getAdminList', params);

/*  updateAdmin 維護代理人  [POST]
 */
export const updateAdmin = postData => post('/manager/updateAdmin', postData);

/** ---------------------------可下單券商資料維護 -------------------------  */

/*  optionQuery 下拉選單查詢 [GET]
 */
export const getBrokerOptions = params => get('/broker/optionQuery', params);

/* getBrokerList 查詢券商清單 [GET]
 */
export const queryBrokerList = params => get('/broker/getBrokerList', params);

/* updateBroker 維護券商 [POST]
 */
export const updateBroker = postData => post('/broker/updateBroker', postData);

/* getStockList 查詢可交易股票清單 [GET]
 */
export const queryBrokerManager = params => get('/broker/getManagerList', params);

/** ---------------------------可交易股票資料維護 -------------------------  */

/* getStockAllowList 查詢可交易股票清單 [GET]
 */
export const queryStockAllowList = params => get('/stockAllow/getStockAllowList', params);

/*  optionQuery 下拉選單查詢 [GET]
 */
export const getStockAllowOptions = params => get('/stockAllow/optionQuery', params);

/* updateStockAllow 維護可交易股票 [POST]
 */
export const updateStockAllow = postData => post('/stockAllow/updateStockAllow', postData);

/** ---------------------------異動記錄清單 -------------------------  */

/* getManageToolLogList 查詢異動記錄清單 [GET]
 */
export const queryLogList = params => get('/manager/getManageToolLogList', params);

/** ---------------------------成交轉檔資料 -------------------------  */

/* getTradeTransactionList 查詢成交轉檔資料 [GET]
 */
export const queryTradeTransactionList = params => get('/tradeTransaction/getTradeTransactionList', params);

/** ---------------------------契約庫存資料 -------------------------  */

/* getStockDepositList 查詢契約庫存資料 [GET]
 */
export const queryStockDepositList = params => get('/stockDeposit/getStockDepositList', params);

/** ---------------------------券商交易成交檔案記錄 -------------------------  */

/* getTradeReportList 查詢券商交易成交檔案記錄 [GET]
 */
export const queryTradeReportList = params => get('/tradeReport/getTradeReportList', params);
