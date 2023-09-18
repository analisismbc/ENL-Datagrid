import { GridCellModes, GridCellModesModel, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { randomId } from "@mui/x-data-grid-generator";

export const handleAddClickCellMode = (
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: GridColDef<any>[],
) => () => {

    const isAnyFieldInEditMode = Object.values(cellModesModel)
        .some((fieldModes) => Object.values(fieldModes).some((mode) => mode.mode === "edit"));

    const isEditModeActive: boolean = !isAnyFieldInEditMode;

    if (isEditModeActive) {

        const id = randomId();

        // Create a new row with dynamic column values
        const newRow: any = {

            id,

            isNew: true,

        };

        // Initialize each field in the new row
        columns.forEach((column) => {

            newRow[column.field] = column.field === 'id' ? id : '';

        });

        setRows([...rows, newRow]);

        // Create a new cellModesModel for the added row
        const updatedCellModesModel: GridCellModesModel = {

            ...cellModesModel,

            [id]: {},

        };

        // Initialize cell modes for each column in the added row
        const firstEditableColumnIndex = columns.findIndex(column => column.editable);

        columns.forEach((column, index) => {

            updatedCellModesModel[id][column.field] = {

                mode: index === firstEditableColumnIndex ? GridCellModes.Edit : GridCellModes.View

            };

        });

        handleCellModesModelChange(updatedCellModesModel);

    }

};
