import { GridPaginationModel } from "@mui/x-data-grid";

/**
* @description Calculate the page based on the index.
*/
export const pagination = (paginationModel: GridPaginationModel, setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>, index: number) => {

    /**
    * @description Calculate the page based on the index.
    */
    const rowsPerPage = paginationModel.pageSize || 1;

    const calculatedPage = Math.ceil((index) / rowsPerPage) - 1;

    /**
    * @description Update the page in the paginationModel.
    */
    setPaginationModel({ ...paginationModel, page: calculatedPage });

}