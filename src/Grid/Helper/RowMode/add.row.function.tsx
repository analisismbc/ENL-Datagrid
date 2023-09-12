import { GridColDef, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";

import { randomId } from "@mui/x-data-grid-generator";

export const handleAddClickRowMode = (
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    columns: GridColDef<any>[],
    rowModesModel: GridRowModesModel
) => () => {

    const isNewRowInEditMode: boolean = Object.values(rows).some((row) => row.isNew);
    const isAnyRowInEditMode: boolean = Object.values(rowModesModel).some((rowModes) => rowModes.mode === GridRowModes.Edit);

    const isEditModeActive: boolean = isNewRowInEditMode || isAnyRowInEditMode;

    if (!isEditModeActive) {

        const id = randomId();

        // Create a new row with dynamic column values
        const newRow = {
            id,
            ...columns,
            isNew: true,
        };

        setRows((oldRows) => [...oldRows, newRow]);

        // Call setRowModesModel with the updated rowModesModel directly
        const updatedRowModesModel: GridRowModesModel = {
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'codigo' },
        };
        setRowModesModel(updatedRowModesModel);
    }
};
