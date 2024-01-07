import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbarExport, GridToolbar, GridApi, GridCellValue } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button, IconButton, colors, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    rows: []
    columns: GridColDef[]
    loading: boolean
}

const getRowId = (row: any) => row.product_name;

function CustomToolbar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <GridToolbar
            sx={{
                "& .MuiButtonBase-root": {
                    color: colors.secondary[500]
                }
            }}
        />
    );
}

const CustomLoadingOverlay = () => {
    return (
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0)', // Set the background color with transparency
        }}
      >
        <div className="loader"></div>
      </div>
    );
  };

export default function DataTable(props: Props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const { data, loading } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 400000,
    //     maxColumns: 16,
    // });
    return (
        <div style={{ height: 'calc(100vh - 250px)', width: '100%' }}>
            <DataGrid
            sx={{background: colors.primary[500], fontSize: "13px"}}
                // rowHeight={30}
                getRowId={getRowId}
                rows={props.rows ? props.rows : []}
                columns={props.columns ? props.columns : []}
                // columns={columns}
                // {...data}
                loading={props.loading}
                components={{
                    Toolbar: CustomToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                        
                }}
            // initialState={{
            //     pagination: {
            //         paginationModel: { page: 0, pageSize: 5 }
            //     },
            // }}
            // pageSizeOptions={[5, 10]}
            // checkboxSelection
            />
        </div>
    );
}
