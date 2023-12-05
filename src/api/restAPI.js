/* eslint-disable object-shorthand */
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_BTRADE = process.env.REACT_APP_API_URL_BTRADE;

export const formPost = async (url, data, debug = false, timeout = 10000) => {
    const token = sessionStorage.getItem('token');
    return axios({
        method: 'POST',
        url: API_URL + url,
        data: data, // post Data
        timeout: timeout, // timeout
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            // const hasToken = !!response.headers.authorization;
            // if (hasToken && process.browser) {
            //     // console.log('have token')
            //     // console.log(response.headers.authorization)
            //     refreshToken(response.headers.authorization);
            // }
            if (response && debug) {
                console.log(`------------------res:${url}------------------`);
                console.log(response.data);
            }
            if (response.status !== 200) {
                alert(response.data.msg);
            }
            return response;
        })
        .catch(e => {
            catchError(e);
            throw e;
        });
};
export const post = async (url, data, debug = false, timeout = 600000) => {
    const token = sessionStorage.getItem('token');
    return axios({
        method: 'POST',
        url: API_URL + url,
        data: data, // post Data
        timeout: timeout, // timeout
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            // const hasToken = !!response.headers.authorization;
            // if (hasToken && process.browser) {
            //     // console.log('have token')
            //     // console.log(response.headers.authorization)
            //     refreshToken(response.headers.authorization);
            // }
            if (response && debug) {
                console.log(`------------------res:${url}------------------`);
                console.log(response.data);
            }
            if (response.status !== 200) {
                alert(response.data.msg);
            }
            return response;
        })
        .catch(e => {
            catchError(e);

            throw e;
        });
};
export const get = async (endPoint, params, debug = false, timeout = 10000) => {
    const token = sessionStorage.getItem('token');

    return axios
        .get(API_URL + endPoint, {
            params,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (response && debug) {
                console.log(`------------------res:${endPoint}------------------`);
                console.log(response.data);
            }
            if (response.status !== 200) {
                return response;
            }
            return response.data;
        })
        .catch(e => {
            catchError(e);
            throw e;
        });
};
export const getBTrade = async (endPoint, params, debug = false, timeout = 10000) => {
    const token = sessionStorage.getItem('token');

    return axios
        .get(API_BTRADE + endPoint, {
            params,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (response && debug) {
                console.log(`------------------res:${endPoint}------------------`);
                console.log(response.data);
            }
            if (response.status !== 200) {
                return response;
            }
            return response.data;
        })
        .catch(e => {
            catchError(e);
            throw e;
        });
};
const catchError = e => {
    if (e?.response?.data?.message) {
        alert(e.response.data.message);
    }
    if (e?.response?.status === 401) {
        const sessionStorageKeys = Object.keys(sessionStorage);
        if (sessionStorageKeys.length > 0) {
            sessionStorage.clear();
        }
        // Router.push('/');
    }
};
export const put = async (url, data, debug = false, timeout = 10000) => {
    const token = sessionStorage.getItem('token');

    return axios({
        method: 'PUT',
        url: API_URL + url,
        data: data, // put Data
        timeout: timeout, // timeout
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json;',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            if (response && debug) {
                console.log(`------------------res:${url}------------------`);
            }
            if (response.status !== 200) {
                return response;
            }
            return response;
        })
        .catch(e => {
            catchError(e);
            throw e;
        });
};
