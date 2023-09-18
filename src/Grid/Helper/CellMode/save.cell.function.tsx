import { GridCellModes, GridCellModesModel, GridCellParams, GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";

import { GridCellNewValueParams } from "../../Utils";
import { MouseEventHandler } from "react";

export const handleSaveClickCellMode = (
    params: GridCellNewValueParams,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
) => {

    const { id, field } = params;

    setRows((rows) =>
        rows.map((row) =>
            row.id === id
                ? { ...row, [field]: params.value }
                : row
        )
    );


};
