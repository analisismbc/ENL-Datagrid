import { GridRowId, GridRowsProp } from "@mui/x-data-grid";

/**
 * @description Handle the removal of a cell in a grid when clicked. 
 */
export const handleDeleteClickCellMode = (
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    id: GridRowId
) => {

    setRows(rows.filter((row) => row?.id !== id));

};
