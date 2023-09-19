import { GridCellModes, GridCellModesModel, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { randomId } from "@mui/x-data-grid-generator";

/**
 * @description Handle the addition of a new cell and row to a grid when a user press enter.
 */
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

        /**
        * @description Create a new row with dynamic column values.
        */
        const newRow: any = {

            id,
            isNew: true,

        };


        /**
        * @description Initialize each field in the new row.
        */
        columns.forEach((column) => {

            newRow[column.field] = column.field === 'id' ? id : '';

        });

        setRows([...rows, newRow]);

        /**
        * @description Create a new cellModesModel for the added row.
        */
        const updatedCellModesModel: GridCellModesModel = {

            ...cellModesModel,
            [id]: {},

        };

        /**
        * @description Initialize cell modes for each column in the added row.
        */
        const firstEditableColumnIndex = columns.findIndex(column => column.editable);

        columns.forEach((column, index) => {

            updatedCellModesModel[id][column.field] = {

                mode: index === firstEditableColumnIndex ? GridCellModes.Edit : GridCellModes.View

            };

        });

        handleCellModesModelChange(updatedCellModesModel);

    }

};
