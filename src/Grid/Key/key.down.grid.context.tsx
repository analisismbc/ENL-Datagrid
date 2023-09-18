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
    handleDeleteClickCellMode,
    handleSaveClickCellMode,
} from "../Helper";

export const handleKeyDownGridContext = (
    params: GridCellParams,
    event: MuiEvent<any>,
    rows: GridRowsProp<any>,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    columns: GridColDef<any>[],
    editionMode: string
) => {

    const selectedRowId = params.id;

    const { mode: cellMode } = cellModesModel[selectedRowId]?.[params.field] || {};

    const handleEnterKey = () => {

        if (cellMode === GridCellModes.Edit) {

            event.defaultMuiPrevented = true;

           // handleSaveClickCellMode(columns, handleCellModesModelChange, cellModesModel, params, rows)(event);

        }
    };

    const handleDeleteKey = () => {

        if (cellMode !== GridCellModes.Edit) {

            event.defaultMuiPrevented = true;

            handleDeleteClickCellMode(rows, setRows, selectedRowId)(event);

        }

    };


    switch (event.key) {

        case 'Enter':

            handleEnterKey();

            break;

        case 'Delete':

            handleDeleteKey();

            break;

        default:
            // Handle other key events if needed
            break;
    }

};
