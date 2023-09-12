import { GridCellModesModel, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";

import { MouseEventHandler } from "react";

export const handleSaveClickRowMode = (
    rows: GridRowsProp<any>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    rowModesModel: GridRowModesModel,
    id: GridRowId
): MouseEventHandler<HTMLButtonElement> => (event) => {

    // Set the mode of the current edited row to view mode
    const updatedRowModes = { ...rowModesModel, [id]: { mode: GridRowModes.View } };

    // Find the index of the current edited row
    const currentEditedRowIndex = rows.findIndex((row) => row.id === id);

    if (currentEditedRowIndex !== -1) {
        const currentRow = rows[currentEditedRowIndex];
        const isTheCurrentRowNew = currentRow.isNew;

        // If there's a next row and it's not new, set its mode to edit
        if (currentEditedRowIndex + 1 < rows.length && !isTheCurrentRowNew) {
            const nextEditedRow = rows[currentEditedRowIndex + 1];
            updatedRowModes[nextEditedRow.id] = { mode: GridRowModes.Edit, fieldToFocus: 'column1' };
        }
    }

    // Apply the updated row modes
    setRowModesModel(updatedRowModes);

};

/*
HACIA ARRIBA
import { MouseEventHandler } from "react";
import { GridRowId, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";

export const handleSaveClick = (
    rows: GridRowsProp<any>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    rowModesModel: GridRowModesModel,
    id: GridRowId
): MouseEventHandler<HTMLButtonElement> => (event) => {
    // Set the mode of the current edited row to view mode
    const updatedRowModes = { ...rowModesModel, [id]: { mode: GridRowModes.View } };

    // Find the index of the last edited row
    const lastEditedRowIndex = rows.reduce((lastIndex, row, currentIndex) => {
        if (row.id === id) {
            return currentIndex;
        }
        return lastIndex;
    }, -1);

    if (lastEditedRowIndex !== -1) {
        // If there's a previous row and it's not new, set its mode to edit
        if (lastEditedRowIndex > 0) {
            const previousEditedRow = rows[lastEditedRowIndex - 1];
            updatedRowModes[previousEditedRow.id] = { mode: GridRowModes.Edit, fieldToFocus: 'codigo' };
        }
    }

    // Apply the updated row modes
    setRowModesModel(updatedRowModes);
};
*/