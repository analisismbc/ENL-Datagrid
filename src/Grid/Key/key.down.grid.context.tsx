import {
    GridCellModes,
    GridCellModesModel,
    GridCellParams,
    GridColDef,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp,
    MuiEvent,
} from "@mui/x-data-grid";
import {
    handleCancelClickRowMode,
    handleDeleteClickCellMode,
    handleDeleteClickRowMode,
    handleSaveClickCellMode,
    handleSaveClickRowMode,
} from "../Helper";

export const handleKeyDownGridContext = (
    params: GridCellParams,
    event: MuiEvent<any>,
    rowModesModel: GridRowModesModel,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    setRowModesModel: (updatedRowModesModel: GridRowModesModel) => void,
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    columns: GridColDef<any>[],
    editionMode: string
) => {

    //console.log('enter-key: ', params)

    const selectedRowId = params.id;

    const { mode: rowMode } = rowModesModel[selectedRowId] || {};

    const { mode: cellMode } = cellModesModel[selectedRowId]?.[params.field] || {};

    const handleEnterKey = () => {

        if (rowMode === GridRowModes.Edit || cellMode === GridCellModes.Edit) {

            event.defaultMuiPrevented = true;

            if (editionMode === 'row') {

                handleSaveClickRowMode(rows, setRowModesModel, rowModesModel, selectedRowId)(event);

            } else {

                handleSaveClickCellMode(columns,setCellModesModel, cellModesModel, params, rows)(event);

            }

        }
    };

    const handleDeleteKey = () => {

        if (rowMode !== GridRowModes.Edit) {

            event.defaultMuiPrevented = true;

            if (editionMode === 'row') {

                handleDeleteClickRowMode(rows, setRows, selectedRowId)(event);

            } else {

                handleDeleteClickCellMode(rows, setRows, selectedRowId)(event);

            }

        }

    };

    const handleEscapeKey = () => {

        if (rowMode === GridRowModes.Edit) {

            event.defaultMuiPrevented = true;

            if (editionMode === 'row') {

                handleCancelClickRowMode(rows, setRows, setRowModesModel, rowModesModel, selectedRowId)(event);

            }

        }

    };

    switch (event.key) {

        case 'Enter':

            handleEnterKey();

            break;

        case 'Delete':

            handleDeleteKey();

            break;

        case 'Escape':

            handleEscapeKey();

            break;

        default:
            // Handle other key events if needed
            break;
    }

};
