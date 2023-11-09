import {
    GridCellModes,
    GridCellModesModel,
    GridCellParams,
    GridPaginationModel,
    gridExpandedRowCountSelector,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { pagination } from "./pagination.cell.function";

/**
* @description Handles the behavior of switching a cell to edit mode when press enter, updating cell modes, and saving changes in a grid.
*/
export const focus = (
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    existingRow: any,
    cellModesModel: GridCellModesModel,
    params: GridCellParams,
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,
) => {

    const id = existingRow?.id ?? 0;

    const field = params?.field ?? 'id';

    /**
    * @description Update cell modes model.
    */
    handleCellModesModelChange({});

    /**
     * @description Finds the row and column indices based on the provided row ID and field name.
     */
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).findIndex(

        (index) => index === id,

    );

    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(

        (column) => column.field === field

    );

    pagination(paginationModel, setPaginationModel, rowIndex);

    /**
    * @description Scroll to the cell.
    */
    setTimeout(() => {

        apiRef.current.scrollToIndexes({ rowIndex, colIndex });

    }, 500);

    /**
     * @description Set focus on the cell.
    */
    apiRef.current.setCellFocus(id, field);

};
