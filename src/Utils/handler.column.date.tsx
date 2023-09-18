import { GridCellModes, GridCellModesModel, GridColDef, GridRowsProp, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { GridCellNewValueParams } from "../Grid/Utils";
import { focus } from "../Grid/Helper/CellMode/focus.cell.function";
import { handleJumpClickCellMode } from "../Grid/Helper/CellMode/jump.cell.function";

export const handleCellFilterDate: Function = (

    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: GridColDef<any>[],
    apiRef: React.MutableRefObject<GridApiCommunity>

) => {

    const rowIndex = rows.findIndex((x) => x.id === params?.id);

    /**
    * @description Check if the current cell is new.
    */
    const isCellNew = rows[rowIndex]?.isNew ?? false;

    /**
    * @description Check if the current cell's value exists in other rows.
    */
    const existingRow = rows.find((row) => {
        const firstDate = row.column2 instanceof Date ? row.column2.getTime() : null;
        const secondDate = params?.value instanceof Date ? params?.value.getTime() : null;
        return row.column1 === rows[rowIndex].column1 && firstDate === secondDate && !row.isNew;
    });


    if (existingRow) {

        setRows((rows) =>
            rows.map((row) =>
                row.id === existingRow.id ? { ...existingRow, isNew: false, ignoreModifications: true } : row
            )
        );

        /**
        * @description Remove the current cell if it's new.
        */
        if (isCellNew) {
            setRows(rows.filter((row) => row?.id !== params?.id ?? 0));

        }

        /**
        * @description Delete an entry from cellModesModel based on the params.id.
        */
        delete cellModesModel[params?.id ?? 0];

        /**
        * @description Use setTimeout to ensure it's called once in the next tick.
        */
        setTimeout(() => {

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef);

        }, 0);

    } else {

        /**
        * @description Calls the default cell event handler when cell event parameters are available..
        */
        if (params) {

            handleJumpClickCellMode(
                columns,
                handleCellModesModelChange,
                cellModesModel,
                params,
                rows,
                setRows,
                apiRef
            )

        }
    }
};
