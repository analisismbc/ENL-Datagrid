import {
    GridCellModesModel,
    GridCellParams,
    GridRowModesModel,
    GridRowsProp,
} from "@mui/x-data-grid";

import { handleAddClickCellMode } from "../Helper/CellMode/add.cell.function";

export const handleKeyDownPageContext = (
    rows: GridRowsProp<any>,
    event: KeyboardEvent,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    columns: any,
    handleCellModesModelChange: (newCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    editionMode: string
) => {

    const handleInsertKey = () => {

        handleAddClickCellMode(handleCellModesModelChange, cellModesModel, rows, setRows, columns)();

    };

    // Check if the Insert key is pressed.
    if (event.key === 'Insert') {

        handleInsertKey();

    }

};
