import { GridRowModel } from "@mui/x-data-grid";

export interface GridCellNewValueParams {
    id: number;
    field: string;
    value: any;
}

/**
 * @description Find and return the parameters for an edited cell value between two grid rows.
 */
export const findEditedCellValue = (newRow: GridRowModel, oldRow: GridRowModel): GridCellNewValueParams | null => {

    for (const key in newRow) {
        if (oldRow[key] !== newRow[key]) {
            return {
                id: newRow.id,
                field: key,
                value: newRow[key],
            };
        }
    }

    /**
    * @description Check if the entire newRow object is identical to the oldRow object.
    */
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
        return {
            id: newRow.id,
            field: newRow.field,
            value: newRow.value,
        };
    }

    return null;
};

