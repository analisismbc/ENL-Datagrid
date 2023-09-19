import { Box, Typography } from "@mui/material";
import { DataGrid, GridCellModesModel, GridColDef, GridPaginationModel, GridRowModel, GridRowsProp, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import { GridCellNewValueParams, findEditedCellValue } from "./Utils/updated.cell";
import { useCallback, useEffect, useState } from "react";

import { generateGridColumns } from "./Utils/Columns";
import { handleJumpClickCellMode } from "./Helper/CellMode/jump.cell.function";
import { handleKeyDownPageContext } from "./Key";

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
        pageSize: 100,
        page: 0,
    });

    const apiRef = useGridApiRef();

    /**
    * @description Updates the cell modes model with a new configuration.
    */
    const handleCellModesModelChange = useCallback((newCellModesModel: GridCellModesModel) => {

        setCellModesModel({ ...newCellModesModel });

    }, [setCellModesModel, cellModesModel]);

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

    /**
    * @description Add a global event listener for keydown events on the whole page for Shift key press.
    */
    useEffect(() => {

        const _handleKeyDownPageContext = (event: KeyboardEvent) => {

            handleKeyDownPageContext(rows,
                event,
                setRows,
                columns,
                handleCellModesModelChange,
                cellModesModel,
                mode);

        };

        document.addEventListener('keydown', _handleKeyDownPageContext);

        /** 
          * @description Cleans up the event listener when the component unmounts. 
        */
        return () => {

            document.removeEventListener('keydown', _handleKeyDownPageContext);

        };

    }, [rows, columns, cellModesModel]);

    /** 
      * @description This function takes a new row and an old row, finds any edited cell values. 
    */
    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {

        console.log('cell-model: ', cellModesModel);

        const params: GridCellNewValueParams | null = findEditedCellValue(newRow, oldRow);

        if (params) {

            handleCellEvent(params);

        }

        return newRow;

    };

    /** 
    *@description Handles cell events based on column-specific search functions or a default behavior. 
    */
    const handleCellEvent = (params: GridCellNewValueParams) => {

        const searchFunction: any = _columns.find((column) => column.field.toString() === params?.field);

        const filter: Function = searchFunction?.search;

        if (searchFunction && filter) {

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
            * @description Default cell event handler for jumping to a specific behavior.
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

    return (

        <Box sx={{
            textAlign: 'center', marginLeft: '15%', marginTop: '7%',
            width: '70%', boxShadow: 3, zIndex: 999, borderRadius: '5px'
        }}>

            <Typography sx={{ background: '#f8f8f8', fontSize: '1.5rem', padding: '10px', }}>

                {`MODE: ${mode.toUpperCase()}`}

            </Typography>

            <DataGrid
                editMode={mode}
                rows={rows}
                columns={columns}
                getRowId={(row: any) => row.id}
                cellModesModel={cellModesModel}
                onCellModesModelChange={handleCellModesModelChange}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => { console.error("Error during row update:", error) }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                apiRef={apiRef}
                sx={{
                    width: '100%',
                    height: '50vh', boxShadow: 0,
                    padding: '0.5vw'
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                //onRowClick={_handleRowClick}
                columnVisibilityModel={{
                    actions: false,
                }}
            />

        </Box>
    );
}