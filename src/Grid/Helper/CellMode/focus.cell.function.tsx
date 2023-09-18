import {
    GridCellModes,
    GridCellModesModel,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { GridCellNewValueParams } from "../../Utils";

/**
* @description Handles the behavior of switching a cell to edit mode when clicked, updating cell modes, and saving changes in a grid.
*/
export const focus = (
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    existingRow: any,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
    apiRef: React.MutableRefObject<GridApiCommunity>
) => {

    const id = existingRow?.id ?? 0;
    const field = params?.field ?? 'id';

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
     * @description Set focus on the cell.
    */
    apiRef.current.setCellFocus(id, field);

    /**
    * @description Set focus on the cell.
    */
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).indexOf(id);
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
        (column) => column.field === field
    );

    /**
    * @description Scroll to the cell.
    */
    apiRef.current.scrollToIndexes({ rowIndex, colIndex });
};
