import { Badge, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellModesModel, GridCellParams, GridColDef, GridPaginationModel, GridRowsProp, GridToolbar, GridTreeNode, MuiEvent, useGridApiRef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";

import FeedIcon from '@mui/icons-material/Feed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SortIcon from '@mui/icons-material/Sort';
import { generateGridColumns } from "./Utils/Columns";
import { handleJumpClickCellMode } from "./Helper/CellMode/jump.cell.function";
import { handleKeyDownGridContext } from "./Key";

const mode = 'cell';

/**
 * @description Props defining the grid configuration, including rows, columns, and event handlers.
 */
interface GridDefinitionProps {

    _rows: GridRowsProp<any>;
    _columns: GridColDef<any>[];
    // _handleRowClick: GridEventListener<"rowClick">;

}

export const FullFeaturedCrudGrid = ({ _columns, _rows /*_handleRowClick*/ }: GridDefinitionProps) => {

    const [rows, setRows] = useState<GridRowsProp<any>>(_rows);

    const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 25,
        page: 0,
    });

    const apiRef = useGridApiRef();

    /**
    * @description Updates the cell modes model with a new configuration.
    */
    const handleCellModesModelChange = useCallback((newCellModesModel: GridCellModesModel) => {

        setCellModesModel({ ...newCellModesModel });

    }, [setCellModesModel]);


    /**
    * @description Use the generateGridColumns function to generate the columns.
    */
    const columns: GridColDef<any>[] = generateGridColumns(
        _columns,
        null, //t
        rows,
        handleCellModesModelChange,
        cellModesModel
    );


    useEffect(() => {

        console.log({ rows });

    }, [rows])

    const handleCellKeyDown = (params: GridCellParams, event: MuiEvent) => {

        if (Object.keys(cellModesModel).length === 0) {

            const syntheticEvent = event as MuiEvent<any>;

            const { key } = syntheticEvent;

            if (params && key === 'Enter') {

                event.defaultMuiPrevented = true;
            }

            handleKeyDownGridContext(
                params, event, rows, setRows, setCellModesModel, cellModesModel, columns, mode, apiRef, paginationModel, setPaginationModel
            );
        }

    };

    const handleCellEditStop = useCallback(async (params: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
        // Use a Promise to wait for the next event loop iteration
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Now, the params object should have the latest values
        params.value = apiRef.current.getCellValue(params.id, params.field);

        params.formattedValue = apiRef.current.getCellValue(params.id, params.field);

        console.log({ params });

        handleCellEvent(params);

    }, [apiRef, rows]);

    /** 
    * @description Handles cell events based on column-specific search functions or a default behavior. 
    */
    const handleCellEvent = (params: GridCellParams) => {

        const onEditStopFunction: any = _columns.find((column) => column.field.toString() === params?.field);

        const filter: Function = onEditStopFunction?.onEditStop;

        if (onEditStopFunction && filter) {

            /**
            * @description Column-specific event handler (if available) for cell events.
            */
            filter(
                handleCellModesModelChange,
                cellModesModel,
                params,
                rows,
                setRows,
                columns,
                apiRef,
                paginationModel,
                setPaginationModel
            );

        } else {

            /**
            * @description Default cell event handler for jumping to the next cell.
            */
            handleJumpClickCellMode(
                columns,
                handleCellModesModelChange,
                cellModesModel,
                params,
                rows,
                setRows,
                apiRef
            )

        }

    }


    const deploymentDate = process.env.REACT_APP_DEPLOYMENT_DATE;
    console.log(`Deployment date: ${deploymentDate}`);



    return (

        <Box sx={{
            textAlign: 'center', marginLeft: '12%', marginTop: '7%',
            width: '80%', boxShadow: 3, zIndex: 999, borderRadius: '5px',
            '@media (max-width: 768px)': {
                marginLeft: '5%',
                width: '90%',
                height: '90vh'
            },
        }}>

            <Typography sx={{ background: '#f8f8f8', fontSize: '1.5rem', padding: '10px', }}>

                {`Deploy: ${process.env.REACT_APP_DEPLOYMENT_DATE}`}

            </Typography>


            <DataGrid
                editMode={mode}
                rows={rows}
                columns={columns}
                rowSelection={false}
                getRowId={(row: any) => row.id}
                cellModesModel={cellModesModel}
                onCellKeyDown={handleCellKeyDown}
                onCellEditStop={handleCellEditStop}
                onCellModesModelChange={handleCellModesModelChange}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                apiRef={apiRef}
                sx={{
                    width: '100%',
                    height: '50vh',
                    boxShadow: 0,
                    padding: '0.5vw',
                    '@media (max-width: 768px)': {
                        width: '100%',
                        height: '80vh',
                        boxShadow: 0,
                        padding: '0.5vw',
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                columnVisibilityModel={{
                    actions: false,
                }}
            />

            <Badge color="primary" badgeContent={paginationModel.page}>
                <MenuBookIcon />
            </Badge>

            <Button color="primary" onClick={() => console.log({ rows })} >
                <FeedIcon />
            </Button>

            <Button color="primary" onClick={() => console.log({ cellModesModel })} >
                <SortIcon />
            </Button>

        </Box>
    );
}


