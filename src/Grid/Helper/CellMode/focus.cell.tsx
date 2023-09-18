import {
    GridCellModes,
    GridCellModesModel,
    gridExpandedSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { GridCellNewValueParams } from "../../Utils";

export const focus = (
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    existingRow: any,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
    apiRef: React.MutableRefObject<GridApiCommunity>
) => {

    const id = existingRow?.id ?? 0;
    const field = params?.field ?? 'id';

    // Update cell modes model
    handleCellModesModelChange({
        [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.View },
        },
    });

    // Set focus on the cell
    apiRef.current.setCellFocus(id, field);

    // Find the rowIndex and colIndex
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).indexOf(id);
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
        (column) => column.field === field
    );

    // Scroll to the cell
    apiRef.current.scrollToIndexes({ rowIndex, colIndex });
};
