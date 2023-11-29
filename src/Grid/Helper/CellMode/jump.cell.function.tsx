import {
    GridCellModesModel,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowsProp,
    gridExpandedSortedRowIdsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { handleCellFocus } from "./focus.cell.function";
import { handleSaveClickCellMode } from "./save.cell.function";

/**
 * @description Handles switching a cell to edit mode when press enter, updating cell modes, and saving changes.
 */
export const handleJumpClickCellMode = (
    columns: GridColDef[],
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellParams,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    apiRef: React.MutableRefObject<GridApiCommunity>,
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,
) => {
    const { id, field } = params;

    setTimeout(() => {

        handleSaveClickCellMode(params, setRows);

    }, 0);

    // Find the index of the row
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).findIndex(

        (rowId) => rowId.toString() === id.toString()

    );

    const keys = Object.keys(rows[0]).filter((key) => key !== "isNew" && key !== "actions" && key !== "ignoreModifications");

    const fieldIndex = keys.indexOf(field);

    let nextFieldIndex = fieldIndex + 1;

    while (nextFieldIndex < keys.length) {

        const nextField = keys[nextFieldIndex];

        apiRef.current.setCellFocus(id, nextField);

        return;
    }

    if (rowIndex < rows.length - 1) {

        const nextRowId = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex + 1];

        apiRef.current.setCellFocus(nextRowId, columns[0].field);
    }

    setCellModesModel({});
};
