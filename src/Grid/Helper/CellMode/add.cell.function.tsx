import {
    GridCellModesModel,
    GridColDef,
    GridPaginationModel,
    GridRowsProp,
} from '@mui/x-data-grid';

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { randomId } from "@mui/x-data-grid-generator";

/**
 * @description Handle the addition of a new cell and row to a grid when a user presses enter.
 */
export const handleAddClickCellMode = async (
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
        .some((fieldModes) => Object.values(fieldModes).some((mode) => mode.mode === 'edit'));

    const isEditModeActive: boolean = isAnyFieldInEditMode;

    if (!isEditModeActive || (isEditModeActive && initializer)) {
        const id = randomId();

        if (!initializer) {
            initializer = {
                column1: 'AAAA'
            };
        }

        const { top } = apiRef.current.getScrollPosition();
        const rowHeight = 52;

        const visibleRowIndex = paginationModel.page > 0
            ? Math.ceil(top / rowHeight) + paginationModel.pageSize * paginationModel.page >
                paginationModel.pageSize * (paginationModel.page + 1)
                ? paginationModel.pageSize * (paginationModel.page + 1) + 5
                : Math.ceil(top / rowHeight) + paginationModel.pageSize * paginationModel.page
            : Math.ceil(top / rowHeight > paginationModel.pageSize ? paginationModel.pageSize + 5 : top / rowHeight);

        const newRow: any = {
            id,
            isNew: true,
        };

        columns.forEach((column) => {
            if (initializer && initializer.hasOwnProperty(column.field)) {
                newRow[column.field] = initializer[column.field] || '-';
            } else {
                newRow[column.field] = column.field === 'id' ? id : '';
            }
        });

        const updatedRows = [...rows];
        updatedRows.splice(visibleRowIndex, 0, newRow);
        setRows(updatedRows);

        const firstColumn = columns[0];

        // Use requestAnimationFrame to ensure that the scrolling is completed before setting focus
        await new Promise<void>((resolve) => {
            const scrollFunction = () => {
                apiRef.current.scrollToIndexes({ rowIndex: visibleRowIndex, colIndex: 0 });
                resolve();
            };

            requestAnimationFrame(scrollFunction);
        });

        // Set focus on the cell
        apiRef.current.setCellFocus(id, firstColumn.field);

        console.log('add -> ', { visibleRowIndex });
    }
};
