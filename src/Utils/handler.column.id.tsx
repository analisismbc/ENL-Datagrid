import { GridCellModes, GridCellModesModel, GridColDef, GridRowsProp, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { GridCellNewValueParams } from "../Grid/Utils";
import { focus } from "../Grid/Helper/CellMode/focus.cell";
import { handleJumpClickCellMode } from "../Grid/Helper";

export const handleCellFilter: Function = (

    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: GridColDef<any>[],
    apiRef: React.MutableRefObject<GridApiCommunity>

) => {

    const rowIndex = rows.findIndex((x) => x.id === params?.id);

    // Check if the current cell is new
    const isCellNew = rows[rowIndex]?.isNew ?? false;

    // Check if the current cell's value exists in other rows
    const existingRow = rows.find(

        (row) => row[params?.field ?? 0] === params?.value && !row.isNew

    );

    if (existingRow) {


        setRows((rows) =>

            rows.map((row) => (row.id === existingRow.id ? { ...existingRow, isNew: false, ignoreModifications: true } : row))

        );

        if (isCellNew) {

            setRows(rows.filter((row) => row?.id !== params?.id ?? 0));

        }

        delete cellModesModel[params?.id ?? 0];

        // Use setTimeout to ensure it's called once in the next tick
        setTimeout(() => {

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef);

        }, 0);


    } else {

        if (params) {

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
};

