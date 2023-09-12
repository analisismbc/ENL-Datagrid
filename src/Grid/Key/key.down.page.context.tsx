import {
    GridCellModesModel,
    GridCellParams,
    GridRowModesModel,
    GridRowsProp,
} from "@mui/x-data-grid";

import { handleAddClickCellMode } from "../Helper/CellMode/add.cell.function";
import { handleAddClickRowMode } from "../Helper";

export const handleKeyDownPageContext = (
    rows: GridRowsProp<any>,
    event: KeyboardEvent,
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp<any>>>,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
    columns: any,
    rowModesModel: GridRowModesModel,
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
    editionMode: string
) => {

    const handleInsertKey = () => {

        if (editionMode === 'row') {

            handleAddClickRowMode(rows, setRows, setRowModesModel, columns, rowModesModel)();

        } else {

            handleAddClickCellMode(setCellModesModel, cellModesModel, rows, setRows, columns)();

        }

    };

    // Check if the Insert key is pressed.
    if (event.key === 'Insert') {

        handleInsertKey();

    }

};
