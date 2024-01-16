import React, { useState, useEffect, useRef } from 'react';

const IdleTimer = ({ onTimeout, idleTime }) => {
    const [isLoggedIn, setLoggedIn] = useState(true);
    const idleTimerRef = useRef(null);
    const resetTimer = () => {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => logout(onTimeout), idleTime * 60 * 1000);
    };

    const logout = () => {
        // 執行登出操作，例如清除使用者驗證狀態，導向登入頁面等
        setLoggedIn(false);
        if (typeof onTimeout === 'function') {
            onTimeout();

            console.log('User logged out at:', new Date());
        }
    };

    // 監聽使用者活動事件
    const onUserActivity = () => resetTimer();

    useEffect(() => {
        // 啟動計時器
        resetTimer();
        // 監聽使用者活動事件
        window.addEventListener('mousemove', onUserActivity);
        window.addEventListener('keypress', onUserActivity);

        // 在元件卸載時清理
        return () => {
            clearTimeout(idleTimerRef.current);
            window.removeEventListener('mousemove', onUserActivity);
            window.removeEventListener('keypress', onUserActivity);
        };
    }, [onTimeout]);

    return null; // IdleTimer 元件不需要渲染任何內容
};

export default IdleTimer;
