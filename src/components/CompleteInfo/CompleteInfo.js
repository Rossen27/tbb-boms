import React from 'react';
const CompleteInfo = ({ loadingFail, msg }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="text-center mt-4">
                    {loadingFail ? (
                        <div>
                            <p className="fs-1">
                                <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                            </p>
                            <p className="fs-2">
                                <strong>{msg}</strong>
                            </p>
                        </div>
                    ) : (
                        <div className="mb-4 text-success fs-2">
                            <p className="fs-1">
                                <i className="bi bi-check-circle-fill"></i>
                            </p>
                            <strong>變更完成</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompleteInfo;
