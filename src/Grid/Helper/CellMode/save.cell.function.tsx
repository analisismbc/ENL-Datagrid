import { GridCellNewValueParams } from "../../Utils";
import { GridRowsProp } from "@mui/x-data-grid";

/**
* @description Handles saving a cell value.
*/
export const handleSaveClickCellMode = (

    params: GridCellNewValueParams,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,

) => {

    const { id, field, value } = params;

    /**
    * @description Handles saving changes to a cell mode when a user press enter.
    */
    setRows((rows) =>
        rows.map((row) =>
            row.id === id
                ? { ...row, [field]: value }
                : row
        )
    );


};
