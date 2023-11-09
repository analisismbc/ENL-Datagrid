import {
    GridCellModesModel,
    GridCellParams,
    GridColDef,
    GridRowsProp,
    gridExpandedRowCountSelector,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
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

    console.log({ keys, fieldIndex, nextFieldIndex, column: Object.keys(rows[0]).filter((key) => key !== "isNew") })

    while (nextFieldIndex < keys.length) {

        console.log('jump-one', { nextFieldIndex, length: keys.length });

        const nextField = keys[nextFieldIndex];

        apiRef.current.setCellFocus(id, nextField);

        return;
    }

    if (rowIndex < rows.length - 1) {

        console.log('jump-two', { rowIndex });

        const nextRowId = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex + 1];

        apiRef.current.setCellFocus(nextRowId, columns[0].field);
    }

    setCellModesModel({});

    // Scroll to the cell
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(

        (column) => column.field === field

    );

    const downRowIndex = Math.min(gridExpandedRowCountSelector(apiRef) - 1, rowIndex + 1);

    apiRef.current.scrollToIndexes({ rowIndex: downRowIndex, colIndex });
};
