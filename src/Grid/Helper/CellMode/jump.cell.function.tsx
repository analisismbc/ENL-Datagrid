import { GridCellModes, GridCellModesModel, GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";

import { GridCellNewValueParams } from "../../Utils";
import { handleSaveClickCellMode } from "./save.cell.function";

export const handleJumpClickCellMode = (
    columns: GridColDef[],
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
) => {

    const { id, field } = params;

    console.log('handleJumpClickCellMode');

    const rowIndex = rows.findIndex((x) => x.id === id);

    // Use setTimeout to ensure it's called once in the next tick
    setTimeout(() => {

        const updatedCellModes: GridCellModesModel = updateCellModeToView(cellModesModel, id, field);

        setNextCellToEditMode(columns, rows, field, updatedCellModes, id, rowIndex);

        setCellModesModel(updatedCellModes);

        handleSaveClickCellMode(params, setRows);

    }, 0);

};

function setNextCellToEditMode(
    columns: GridColDef[],
    rows: readonly any[],
    field: string,
    updatedCellModes: GridCellModesModel,
    id: GridRowId,
    rowIndex: number
) {

    const keys = Object.keys(rows[0]).filter((key) => key !== "isNew");

    const fieldIndex = keys.indexOf(field);

    let nextFieldIndex = fieldIndex + 1;

    // Iterate through fields until an editable one is found or we reach the end.
    while (nextFieldIndex < keys.length) {

        const nextField = keys[nextFieldIndex];

        // Checks if a field is editable.
        if (isFieldEditable(nextField, columns)) {

            updatedCellModes[id][nextField] = { mode: GridCellModes.Edit };

            return; // Exit the function after setting the next editable cell to edit mode.
        }

        nextFieldIndex++;

    }

    // If no editable cell was found in the current row, move to the next row.
    if (rowIndex < rows.length - 1) {

        const nextRowId = rows[rowIndex + 1].id;

        if (!updatedCellModes[nextRowId]) {

            updatedCellModes[nextRowId] = {};

        }

        // First editable field in the next row.
        const firstEditableField = findFirstEditableField(keys, columns);

        if (firstEditableField) {

            updatedCellModes[nextRowId][firstEditableField] = { mode: GridCellModes.Edit };

        }

    }

}

function isFieldEditable(field: string, columns: GridColDef[]): boolean {

    return columns.find((col) => col.field === field)?.editable || false;

}

function findFirstEditableField(fields: string[], columns: GridColDef[]): string | undefined {

    return fields.find((field) => isFieldEditable(field, columns));

}

function updateCellModeToView(cellModesModel: GridCellModesModel, id: GridRowId, field: string): GridCellModesModel {

    return {

        ...cellModesModel,

        [id]: {

            ...cellModesModel[id],

            [field]: { mode: GridCellModes.View },

        },

    };


}

