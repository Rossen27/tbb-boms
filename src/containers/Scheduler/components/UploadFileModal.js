import React, { useState } from 'react';
import { ModalEdit } from '@components';
import { useStore } from '@store';
import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import { Box, Button, TextField } from '@mui/material';
import { uploadStyle, holidayFlagText, btnStyle } from '../constant/scheduler';

const UploadFileModal = () => {
    const {
        SchedulerStore: {
            uploadFileModalVisible,
            closeUploadFileModal,
            upload,
            updateData,
            uploadDisabled,
            schedulerData,
            cSchedulerData,
            applyDisabled,
            updateSchedule,
            schedulerAFlag,
        },
    } = useStore();
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const onDrop = (accepted, rejected) => {
        // 处理已接受的文件
        setAcceptedFiles(accepted);
    };
    const { getRootProps, getInputProps, open } = useDropzone({ onDrop });
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    if (acceptedFiles.length <= 0) {
        updateData('uploadDisabled', true);
    } else {
        updateData('uploadDisabled', false);
    }
    return (
        <ModalEdit open={uploadFileModalVisible} onClose={closeUploadFileModal} title={'上傳'}>
            <Box {...getRootProps()} sx={[uploadStyle.outer]}>
                <input {...getInputProps()} />
                <p className="text-center">拖曳檔案至此或點擊開啟資料夾</p>
            </Box>
            <aside>
                <h4 className="fw-bold">檔案列表</h4>
                <ol>{files}</ol>
            </aside>
            <div className="d-flex justify-content-center">
                <Button
                    sx={[btnStyle.btn, btnStyle.btnQuery]}
                    onClick={e => {
                        e.preventDefault();
                        setAcceptedFiles([]);
                    }}
                >
                    清除
                </Button>
                <Button
                    sx={[btnStyle.btn, btnStyle.btnUpload]}
                    onClick={async e => {
                        e.preventDefault();
                        if (acceptedFiles.length > 0) {
                            const formData = new FormData();
                            for (const file of acceptedFiles) {
                                formData.append('file', file);
                            }
                            await upload(formData);
                            setAcceptedFiles([]);
                            updateData('uploadFileModalVisible', false);
                        } else {
                            updateData('uploadDisabled', true);
                        }
                    }}
                    disabled={uploadDisabled}
                >
                    上傳
                </Button>
            </div>
        </ModalEdit>
    );
};

export default observer(UploadFileModal);
