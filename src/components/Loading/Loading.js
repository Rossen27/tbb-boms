import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
const Loading = ({ isLoading }) => {
    return (
        <div className="card mb-0">
            <div className="card-body">
                <div className="text-center  mt-5">
                    <RotatingLines
                        strokeColor="#FFB249"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={isLoading}
                    />
                    <p className="mt-5">
                        資料更新中，請稍後... <br />
                        ※為避免產生系統錯誤，請勿離開畫面、重新整理或返回上一步。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;
