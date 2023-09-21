import { GridCellModes, GridCellModesModel, GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { GridCellNewValueParams } from "../../Utils";
import { handleSaveClickCellMode } from "./save.cell.function";

/**
* @description Handles switching a cell to edit mode when press enter, updating cell modes, and saving changes.
*/
export const handleJumpClickCellMode = (

    columns: GridColDef[],
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    apiRef: React.MutableRefObject<GridApiCommunity>,

) => {

    const { id, field } = params;

    const rowIndex = rows.findIndex((x) => x.id.toString() === id.toString());

    /**
    * @description Use setTimeout to ensure it's called once in the next tick.
    */
    setTimeout(() => {

        /**
        * @description Delete an entry from cellModesModel based on the params.id.
        */
        delete cellModesModel[params?.id.toString() ?? 0];

        /**
         * @description Sets the next editable cell to edit mode in the current or next row.
         */
        setNextCellToEditMode(columns, rows, field, cellModesModel, setCellModesModel, id, rowIndex);

        /**
         * @description Handles saving changes to a cell value after switching cell modes.
         */
        handleSaveClickCellMode(params, setRows);

    }, 0);

};

function setNextCellToEditMode(

    columns: GridColDef[],
    rows: readonly any[],
    field: string,
    cellModesModel: GridCellModesModel,
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
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

            if (!cellModesModel[id]) {
                cellModesModel[id] = {};
            }

            cellModesModel[id][nextField] = { mode: GridCellModes.Edit };

            setCellModesModel(cellModesModel);

            return; // Exit the function after setting the next editable cell to edit mode.
        }

        nextFieldIndex++;

    }

    // If no editable cell was found in the current row, move to the next row.
    if (rowIndex < rows.length - 1) {

        const nextRowId = rows[rowIndex + 1].id;

        if (!cellModesModel[nextRowId]) {

            cellModesModel[nextRowId] = {};

        }

        // First editable field in the next row.
        const firstEditableField = findFirstEditableField(keys, columns);

        if (firstEditableField) {

            cellModesModel[nextRowId][firstEditableField] = { mode: GridCellModes.Edit };

        }

        setCellModesModel(cellModesModel);

    }

}

function isFieldEditable(field: string, columns: GridColDef[]): boolean {

    return columns.find((col) => col.field === field)?.editable || false;

}

function findFirstEditableField(fields: string[], columns: GridColDef[]): string | undefined {

    return fields.find((field) => isFieldEditable(field, columns));

}

