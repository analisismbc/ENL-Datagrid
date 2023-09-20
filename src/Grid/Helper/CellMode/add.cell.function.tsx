import { GridCellModes, GridCellModesModel, GridColDef, GridPaginationModel, GridRowsProp, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
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
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,

) => {

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

        /**
        * @description Scroll to the cell.
        */
        setTimeout(() => {

            /**
            * @description Finds the row and column indices based on the provided row ID and field name.
            */
            const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).indexOf(id);

            const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
                (column) => column.field === 'column1'
            );

            /**
            * @description Set focus on the cell.
            */
            apiRef.current.setCellFocus(id, 'column1');

            apiRef.current.scrollToIndexes({ rowIndex, colIndex });

        }, 100);

    }

};
