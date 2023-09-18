import { GridRowModel } from "@mui/x-data-grid";

export interface GridCellNewValueParams {
    id: number;
    field: string;
    value: any;
}

export const findEditedCellValue = (newRow: GridRowModel, oldRow: GridRowModel): GridCellNewValueParams | null => {

    console.clear();

    console.log('new: ', newRow);

    console.log('old: ', oldRow);

    for (const key in newRow) {
        if (oldRow[key] !== newRow[key]) {
            return {
                id: newRow.id,
                field: key,
                value: newRow[key],
            };
        }
    }

    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
        return {
            id: newRow.id,
            field: newRow.field,
            value: newRow.value,
        };
    }

    return null; // Ningún cambio detectado
};

