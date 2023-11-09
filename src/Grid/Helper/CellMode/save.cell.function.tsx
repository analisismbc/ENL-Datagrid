import { GridCellParams, GridRowsProp } from "@mui/x-data-grid";

/**
* @description Handles saving a cell value.
*/
export const handleSaveClickCellMode = (
    params: GridCellParams,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
) => {
    const { id, field, value, row } = params;

    console.log('save', { params });

    /**
    * @description Handles saving changes to a cell mode when a user press enter.
    */
    setRows((rows) =>
        rows.map((currentRow) =>
            currentRow.id === id
                ? { ...currentRow, [field]: value, isNew: false } // set isNew to false if it exists
                : currentRow
        )
    );
};
