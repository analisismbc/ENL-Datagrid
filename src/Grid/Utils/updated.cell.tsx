import { GridCellModesModel, GridColDef, GridRowModel, GridRowsProp } from "@mui/x-data-grid";

export interface GridCellNewValueParams {
    id: any;
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

    return null;
};


export const findNonEditedCellValue = (cellModesModel: GridCellModesModel, columns: GridColDef<any>[], rows: GridRowsProp<any>): GridCellNewValueParams | null => {

    // Extract the dynamic field name and parent key
    let field, id: string;

    for (const key in cellModesModel) {

        if (cellModesModel.hasOwnProperty(key)) {

            id = key;

            field = Object.keys(cellModesModel[key])[0];

            const row = rows.find((row) => row.id.toString() === id);

            if (row && row.hasOwnProperty(field)) {

                // Check if the current 'field' is the last column in the 'columns' array
                const isLastColumn = field === columns[columns.length - 1].field;

                return {
                    id: id,
                    field: field,
                    value: row[field],
                };

            } else {

                return null;

            }

        }

    }

    return null;
};
