import { GridRowId, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";

import { MouseEventHandler } from "react";

export const handleCancelClickRowMode = (
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    rowModesModel: GridRowModesModel,
    id: GridRowId
): MouseEventHandler<HTMLButtonElement> => (event) => {

    // Use the rows prop, setRows function, and rowModesModel here
    const updatedRowModesModel = {
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
    };
    // Update the rowModesModel state or perform any other necessary actions
    setRowModesModel(updatedRowModesModel);

    const editedRow = rows.find((row) => row?.id === id);
    if (editedRow?.isNew) {
        // Use the rows prop and setRows function here to update the rows
        const updatedRows = rows.filter((row) => row?.id !== id);
        setRows(updatedRows);
    }
};
