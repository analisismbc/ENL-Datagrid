import { GridRowId, GridRowsProp } from "@mui/x-data-grid";

import { MouseEventHandler } from "react";

export const handleDeleteClickRowMode = (
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    id: GridRowId
): MouseEventHandler<HTMLButtonElement> => (event) => {

    setRows(rows.filter((row) => row?.id !== id));
};
