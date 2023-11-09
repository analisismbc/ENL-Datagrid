import { GridCellModesModel, GridCellParams, GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { handleAddClickCellMode, handleJumpClickCellMode } from "../Grid/Helper";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { focus } from "../Grid/Helper/CellMode/focus.cell.function";

export const handleCellFilter: Function = (

    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellParams,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: GridColDef<any>[],
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,

) => {


    const rowIndex = rows.findIndex((x) => x.id === params?.id);

    /**
    * @description Check if the current cell is new.
    */
    const isCellNew = rows[rowIndex]?.isNew ?? false;

    /**
    * @description Check if the current cell's value exists in other rows.
    */

    const existingRow = rows.find(

        (row) => row[params?.field ?? 0] === params?.value && !row.isNew

    );

    const existingRowIndex = existingRow ? rows.indexOf(existingRow) : -1;

    /**
    * @description Register exist and is not new.
    */
    if (existingRow && !isCellNew && existingRowIndex != rowIndex) {

        console.log('(1)');

        setRows((rows) =>

            rows.map((row) => (row.id === existingRow.id ? { ...existingRow, isNew: false, ignoreModifications: true } : row))

        );

        /**
        * @description Use setTimeout to ensure it's called once in the next tick.
        */
        setTimeout(() => {

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef, paginationModel, setPaginationModel);

        }, 0);


    }

    /**
    * @description Register does not exist and is not new.
    */
    else if (!existingRow && !isCellNew) {

        console.log('(2)');

        setRows((rows) =>

            rows.map((row) => (row.id === params.id ? { ...params.row, isNew: false, ignoreModifications: true } : row))

        );

        /**
        * @description Use setTimeout to ensure it's called once in the next tick.
        */
        setTimeout(() => {

            handleAddClickCellMode(handleCellModesModelChange, cellModesModel, rows, setRows, columns, apiRef, paginationModel, setPaginationModel, { column1: params?.value });

        }, 0);


    }

    /**
    * @description Register does not exist and is new.
    */
    else if (!existingRow && isCellNew) {

        console.log('(3)');

        setTimeout(() => {

            if (params) {

                /**
                * @description Calls the default cell event handler when cell event parameters are available..
                */
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

        }, 0);

    }

    /**
* @description Register does not exist and is new.
*/
    else if (existingRow && isCellNew) {

        console.log('(4)');

        /**
        * @description Remove the current cell if it's new.
        */
        if (isCellNew) {

            setRows(rows.filter((row) => row?.id !== params?.id ?? 0));

        }

        /**
        * @description Use setTimeout to ensure it's called once in the next tick.
        */
        setTimeout(() => {

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef, paginationModel, setPaginationModel);

        }, 0);


    }
    /**
    * @description Register exist and is in the same index.
    */
    else if (existingRow && !isCellNew && existingRowIndex === rowIndex) {

        console.log('(5)');

        setTimeout(() => {

            if (params) {

                /**
                * @description Calls the default cell event handler when cell event parameters are available..
                */
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

        }, 0);
    }
};
