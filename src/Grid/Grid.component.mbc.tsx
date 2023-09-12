import { Box, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridCellModesModel, GridCellParams, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, MuiEvent, useGridApiRef } from "@mui/x-data-grid";
import { handleKeyDownGridContext, handleKeyDownPageContext } from "./Key";
import { useEffect, useState } from "react";

import { findEditedCellValue } from "./Utils/updated.cell";
import { generateGridColumns } from "./Utils/Columns";

const mode = 'cell';

interface GridDefinitionProps {

    _rows: GridRowsProp<any>;
    _columns: GridColDef<any>[];
    // _handleRowClick: GridEventListener<"rowClick">;

}

export const FullFeaturedCrudGrid = ({ _columns, _rows /*_handleRowClick*/ }: GridDefinitionProps) => {

    const [rows, setRows] = useState<GridRowsProp<any>>(_rows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});
    const apiRef = useGridApiRef();

    // Use the generateGridColumns function to generate the columns
    const columns: GridColDef<any>[] = generateGridColumns(
        _columns,
        null, //t
        rows,
        setRows,
        setRowModesModel,
        rowModesModel,
        setCellModesModel,
        cellModesModel
    );

    useEffect(() => { console.log('rows-effect: ', rows) }, [rows])

    // Add a global event listener for keydown events on the whole page for Shift key press
    useEffect(() => {

        const _handleKeyDownPageContext = (event: KeyboardEvent) => {

            handleKeyDownPageContext(rows,
                event,
                setRows,
                setRowModesModel,
                columns,
                rowModesModel,
                setCellModesModel,
                cellModesModel,
                mode);

        };

        document.addEventListener('keydown', _handleKeyDownPageContext);

        // Clean up the event listener when the component unmounts
        return () => {

            document.removeEventListener('keydown', _handleKeyDownPageContext);
        };

    }, [setRows, setRowModesModel, columns, rowModesModel]);


    const handleCellKeyDown = (params: GridCellParams, event: MuiEvent) => {

        handleKeyDownGridContext(params, event, rowModesModel, rows, setRows, setRowModesModel, setCellModesModel, cellModesModel, columns, mode);

    };

    //--------------------------------------------------------------
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {

        if (params.reason === GridRowEditStopReasons.rowFocusOut) {

            event.defaultMuiPrevented = true;

            const rowFocusOutRow = { ...rowModesModel, [params.id]: { mode: GridRowModes.View } };

            setRowModesModel(rowFocusOutRow);
        }

    };


    //----------------------------------------------------------------

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {

        console.log('new-value: ', findEditedCellValue(newRow, oldRow))

        setRows((rows) =>

            rows.map((row) => (row.id === newRow.id ? { ...newRow, isNew: false } : row))

        );

        return newRow;

    };

    //----------------------------------------------------------------
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {

        setRowModesModel(newRowModesModel);

    };

    const handleCellModesModelChange = (newCellModesModel: GridCellModesModel) => {

        setCellModesModel(newCellModesModel);

    };

    //-----------------------------------------------------------------

    return (
        <Box sx={{
            textAlign: 'center', marginLeft: '15%', marginTop: '7%',
            width: '70%', boxShadow: 3, zIndex: 999, borderRadius: '5px'
        }}>
            <Typography sx={{
                height: '2.3vw', borderRadius: '5px',
                background: '#f8f8f8', color: '#1976d2',
                fontSize: '1.5rem', textAlign: 'center',
                padding: '10px', paddingBottom: '10px'
            }}>MODE: {mode.toUpperCase()}
            </Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                processRowUpdate={processRowUpdate}
                editMode={mode}
                apiRef={apiRef}
                sx={{
                    width: '100%',
                    height: '50vh', boxShadow: 0,
                    padding: '0.5vw'
                }}
                rowModesModel={rowModesModel}
                cellModesModel={cellModesModel}
                //onRowClick={_handleRowClick}
                onCellKeyDown={handleCellKeyDown}
                onRowModesModelChange={handleRowModesModelChange}
                onCellModesModelChange={handleCellModesModelChange}
                onRowEditStop={handleRowEditStop}
                //onCellEditStop={handleCellEditStop}
                columnVisibilityModel={{
                    actions: false,
                }}
            />
        </Box>
    );
}