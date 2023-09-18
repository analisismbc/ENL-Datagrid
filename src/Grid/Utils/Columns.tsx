import { GridActionsCellItem, GridCellModesModel, GridColDef, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { GridRowsProp } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';

export const generateGridColumns = (
    customColumns: GridColDef<any>[],
    t: any,
    rows: GridRowsProp<any>,
    setCellModesModel: (updatedCellModesModel: GridCellModesModel) => void,
    cellModesModel: GridCellModesModel,
) => {
    const columns: GridColDef<any>[] = [
        ...customColumns,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 100,
            flex: 3,
            cellClassName: 'actions',
            renderCell: ({ id }) => {
                const isInEditMode = true;//rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon sx={{ color: 'green' }} />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                        //onClick={handleSaveClickRowMode(rows, setRowModesModel, rowModesModel, id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon sx={{ color: 'red' }} />}
                            label="Cancel"
                            className="textPrimary"
                            //onClick={handleCancelClickRowMode(rows, setRows, setRowModesModel, rowModesModel, id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon sx={{ color: 'lightblue' }} />}
                        label="Edit"
                        className="textPrimary"
                        //onClick={handleEditClickRowMode(rows, setRowModesModel, id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<AddIcon sx={{ color: 'lightblue' }} />}
                        label="Add"
                        //onClick={handleAddClickRowMode(rows, setRows, setRowModesModel, columns, rowModesModel)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: 'lightblue' }} />}
                        label="Delete"
                        //={handleDeleteClickRowMode(rows, setRows, id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return columns;
};
