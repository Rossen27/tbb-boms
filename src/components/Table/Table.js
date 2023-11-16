import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ header, data, onRowClick, hideFooter, getRowId, onCellClick }) => {
    const [pageSize, setPageSize] = useState(10);
    return (
        <div style={{}}>
            <DataGrid
                autoHeight
                sx={{
                    mt: 2,
                    pl: 0,
                    '& .table-header': { backgroundColor: '#F5F5F7' },
                    '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600 },
                    '& .MuiDataGrid-columnSeparator': { visibility: 'hidden' },
                    '& .MuiDataGrid-sortIcon': { color: '#E24041' },
                    '& .MuiDataGrid-iconButtonContainer': { visibility: 'visible' },
                }}
                rows={data}
                rowHeight={60}
                columns={header}
                pageSize={pageSize}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pagination
                onRowClick={onRowClick}
                onCellClick={onCellClick}
                disableColumnFilter
                hideFooter={hideFooter}
                getRowId={getRowId}
            />
        </div>
    );
};

export default Table;
