import { GridCellModesModel, GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { handleAddClickCellMode, handleJumpClickCellMode } from "../Grid/Helper";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { GridCellNewValueParams } from "../Grid/Utils";
import { focus } from "../Grid/Helper/CellMode/focus.cell.function";

export const handleCellFilter: Function = (

    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    params: GridCellNewValueParams | null,
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

        (row) => row[params?.field ?? 0] === params?.value && !row.isNew && row.id.toString() !== params?.id.toString()

    );

    if (existingRow) {


        setRows((rows) =>

            rows.map((row) => (row.id === existingRow.id ? { ...existingRow, isNew: false, ignoreModifications: true } : row))

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

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef, paginationModel, setPaginationModel);

        }, 0);


    } else if (!existingRow && !isCellNew) {

        handleAddClickCellMode(handleCellModesModelChange, cellModesModel, rows, setRows, columns, apiRef, paginationModel, setPaginationModel, { column1: params?.value });

        /**
        * @description Use setTimeout to ensure it's called once in the next tick.
        */
        setTimeout(() => {

            focus(handleCellModesModelChange, existingRow, cellModesModel, params, apiRef, paginationModel, setPaginationModel);

        }, 0);

    }

    else {

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

    }
};

