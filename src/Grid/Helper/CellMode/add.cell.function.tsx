import { GridCellModes, GridCellModesModel, GridColDef, GridPaginationModel, GridRowsProp, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from "@mui/x-data-grid";

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

        const visibleRowIndex =
            paginationModel.page > 0 ?
                Math.floor(top / 40) + paginationModel.pageSize * paginationModel.page >
                    paginationModel.pageSize * (paginationModel.page + 1) ?
                    (paginationModel.pageSize * (paginationModel.page + 1)) - 2 :
                    Math.floor(top / 40) + paginationModel.pageSize * paginationModel.page :

                Math.floor(top / 40 > paginationModel.pageSize ?
                    paginationModel.pageSize - 2 :
                    top / 40);

        console.log('visibleRowIndex: ', { visibleRowIndex, page: paginationModel.page, top });

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


const getCurrentVisibleRow = (apiRef: React.MutableRefObject<GridApiCommunity>) => {
    const { top } = apiRef.current.getScrollPosition();
    const visibleRowIndex = Math.floor(top / 30);
    return visibleRowIndex;
};