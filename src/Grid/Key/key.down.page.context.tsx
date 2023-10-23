import {
    GridCellModesModel,
    GridCellParams,
    GridPaginationModel,
    GridRowModesModel,
    GridRowsProp,
} from "@mui/x-data-grid";

import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { handleAddClickCellMode } from "../Helper/CellMode/add.cell.function";

export const handleKeyDownPageContext = (
    rows: GridRowsProp<any>,
    event: KeyboardEvent,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: any,
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    editionMode: string,
    apiRef: React.MutableRefObject<GridApiCommunity>,
    paginationModel: GridPaginationModel,
    setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>,
) => {

    const handleInsertKey = () => {

        handleAddClickCellMode(handleCellModesModelChange, cellModesModel, rows, setRows, columns, apiRef, paginationModel, setPaginationModel, null);

    };

    // Check if the Insert key is pressed.
    if (event.key === 'Insert') {

        handleInsertKey();

    }

};
