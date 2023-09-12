import { GridRowModel } from "@mui/x-data-grid";

interface GridCellNewValueParams {
    id: number;
    field: string;
    value: any;
}

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

    return null;

}