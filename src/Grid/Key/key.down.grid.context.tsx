import {
    GridCellModes,
    GridCellModesModel,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowsProp,
    MuiEvent,
} from "@mui/x-data-grid";
import {
    handleAddClickCellMode,
    handleDeleteClickCellMode,
    handleJumpClickCellMode,
} from "../Helper";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";

export const handleKeyDownGridContext = (
    params: GridCellParams,
    event: MuiEvent<any>,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    columns: GridColDef<any>[],
    editionMode: string,
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,
) => {

    const selectedRowId = params.id;

    const { mode: cellMode } = cellModesModel[selectedRowId]?.[params.field] || {};

    const handleEnterKey = () => {

        console.log('enter-listener');
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

    };

    const handleDeleteKey = () => {

        if (cellMode !== GridCellModes.Edit) {

            event.defaultMuiPrevented = true;

            handleDeleteClickCellMode(rows, setRows, selectedRowId);

        }

    };

    const handleInsertKey = () => {

        handleAddClickCellMode(handleCellModesModelChange, cellModesModel, rows, setRows, columns, apiRef, paginationModel, setPaginationModel, null);

    };

    switch (event.key) {

        case 'Enter':

            handleEnterKey();

            break;

        case 'Delete':

            handleDeleteKey();

            break;

        case 'Insert':

            handleInsertKey();

            break;

        default:
            // Handle other key events if needed
            break;
    }

};
