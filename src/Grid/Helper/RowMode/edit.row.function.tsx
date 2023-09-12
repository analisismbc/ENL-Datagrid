import { GridRowId, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";

import { MouseEventHandler } from "react";

export const handleEditClickRowMode = (
    rows: GridRowsProp<any>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    id: GridRowId
): MouseEventHandler<HTMLButtonElement> => (event) => {

    const updatedRowModes: GridRowModesModel = {};
    rows.forEach(row => {
        if (row.id === id) {
            updatedRowModes[id] = { mode: GridRowModes.Edit };
        } else {
            updatedRowModes[row.id] = { mode: GridRowModes.View };
        }
    });

    setRowModesModel(updatedRowModes);
};
