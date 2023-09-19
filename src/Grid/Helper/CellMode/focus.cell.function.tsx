import {
    GridCellModes,
    GridCellModesModel,
    GridPaginationModel,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { GridCellNewValueParams } from "../../Utils";
import { pagination } from "./pagination.cell.function";

/**
* @description Handles the behavior of switching a cell to edit mode when press enter, updating cell modes, and saving changes in a grid.
*/
export const focus = (
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    existingRow: any,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,
) => {

    const id = existingRow?.id ?? 0;
    const field = params?.field ?? 'id';

    pagination(paginationModel, setPaginationModel, id);

    /**
    * @description Update cell modes model.
    */
    handleCellModesModelChange({
        [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.View },
        },
    });

    /**
     * @description Finds the row and column indices based on the provided row ID and field name.
     */
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).indexOf(id);
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
        (column) => column.field === field
    );

    /**
     * @description Set focus on the cell.
    */
    apiRef.current.setCellFocus(id, field);


    /**
    * @description Scroll to the cell.
    */
    setTimeout(() => {

        apiRef.current.scrollToIndexes({ rowIndex, colIndex });

    }, 100);

};
