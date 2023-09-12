import {
    GridCellModes,
    GridCellModesModel,
    GridCellParams,
    GridRowId,
    GridRowsProp,
} from "@mui/x-data-grid";

import { MouseEventHandler } from "react";

export const handleCellInnerSearch: (
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellParams,
    rows: GridRowsProp<any>
) => MouseEventHandler<HTMLButtonElement> = (
    setCellModesModel,
    cellModesModel,
    params,
    rows
) => (event) => {
    const { id, field, value } = params;
    const rowIndex = rows.findIndex((x) => x.id === id);

    // Check if the current cell is new
    const isCellNew = rows[rowIndex].isNew || false;

    // Check if the current cell's value exists in other rows
    const valueExists = rows.some((row) => row[field] === value && !row.isNew);

    //console.log('exists: ', params);

    const requireRedirect = isCellNew && valueExists;

    if (requireRedirect) {
        // Handle the case where the value already exists
        // For example, you can show a message to the user or perform another action.
        alert("Value already exists in other rows");
    } else {

    }
};

