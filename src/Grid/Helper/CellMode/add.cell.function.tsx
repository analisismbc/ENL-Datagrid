import { GridCellModes, GridCellModesModel, GridColDef, GridPaginationModel, GridRowHeightParams, GridRowsProp, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from '@mui/x-data-grid';

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { pagination } from "./pagination.cell.function";
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
    initializer: Record<string, any> | null,
) => {

    const isAnyFieldInEditMode = Object.values(cellModesModel)
        .some((fieldModes) => Object.values(fieldModes).some((mode) => mode.mode === "edit"));

    const isEditModeActive: boolean = !isAnyFieldInEditMode;


    if (isEditModeActive) {

        const id = randomId();

        /**
        * @description Get the currently visible row based on the scroll position.
        */
        const { top } = apiRef.current.getScrollPosition();

        const rowHeight = 52;

        const visibleRowIndex =
            paginationModel.page > 0 ?
                Math.ceil(top / rowHeight) + paginationModel.pageSize * paginationModel.page >
                    paginationModel.pageSize * (paginationModel.page + 1) ?
                    (paginationModel.pageSize * (paginationModel.page + 1)) + 5 :
                    Math.ceil(top / rowHeight) + paginationModel.pageSize * paginationModel.page :

                Math.ceil(top / rowHeight > paginationModel.pageSize ?
                    paginationModel.pageSize + 5 :
                    top / rowHeight);


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
            if (initializer && initializer.hasOwnProperty(column.field)) {
                newRow[column.field] = initializer[column.field] || '';
            } else {
                newRow[column.field] = column.field === 'id' ? id : '';
            }
        });

        const updatedRows = [...rows];

        updatedRows.splice(visibleRowIndex, 0, newRow);

        setRows(updatedRows);

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