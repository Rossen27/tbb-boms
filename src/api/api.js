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

/* updateAgent 維護代理人  [POST]
 */
export const updateAgent = postData => post('/manager/updateAgent', postData);
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
/* getAgentList 查詢代理人清單 [GET]
 */
export const queryBrokerManager = params => get('/broker/getManagerList', params);
/* repaymentQuery 客戶還款查詢 [GET]
 */
export const getRepaymentQuery = params => get('/ScLoanAdmin020/repaymentQuery', params);
/* repaymentOptionQuery 客戶還款選單查詢 [GET]
 */
export const getRepaymentOptionQuery = params => get('/ScLoanAdmin020/repaymentOptionQuery', params);
/* repaymentUpdate 客戶還款資訊維護 [POST]
 */
export const callRepaymentUpdate = postData => post('/ScLoanAdmin020/repaymentUpdate', postData);

/** -------------------------增加擔保品--------------------------   */
/* lendCollateralOptionQuery 增加擔保品選單查詢 [GET]
 */
export const getLendCollateralOptionQuery = params => get('/ScLoanAdmin030/lendCollateralOptionQuery', params);

/** lendCollateralQuery 客戶增加擔保品查詢[GET]
 */
export const getLendCollateralQuery = params => get('/ScLoanAdmin030/lendCollateralQuery', params);

/** -------------------------退還擔保品--------------------------   */
/* returnCollateralOptionQuery 退還擔保品選單查詢 [GET]
 */
export const getReturnCollateralOptionQuery = params => get('/ScLoanAdmin040/returnCollateralOptionQuery', params);

/** returnCollateralQuery 客戶退還擔保品庫存查詢[GET]
 */
export const getReturnCollateralQuery = params => get('/ScLoanAdmin040/returnCollateralQuery', params);

/** --------------------------- 人員權限 -------------------------   */
/* roleTaskQuery 人員權限查詢 [GET]
 */
export const getRoleTaskQuery = params => get('/ScLoanAdmin050/roleTaskQuery', params);

/* roleTaskUpdate 人員權限維護 [POST]
 */
export const callRoleTaskUpdate = postData => post('/ScLoanAdmin050/roleTaskUpdate', postData);

/** --------------------------- 功能管理 -------------------------   */
/* roleTaskQuery 功能開關查詢 [GET]
 */
export const getSwitchOptionQuery = params => get('/ScLoanAdmin060/switchOptionQuery', params);

/* roleTaskUpdate 功能開關維護 [POST]
 */
export const callSwitchOptionUpdate = postData => post('/ScLoanAdmin060/switchOptionUpdate', postData);
