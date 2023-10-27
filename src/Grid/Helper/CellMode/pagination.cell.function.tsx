import { GridPaginationModel } from "@mui/x-data-grid";

/**
* @description Calculate the page based on the index.
*/
export const pagination = (paginationModel: GridPaginationModel, setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>, index: number) => {

    const rowsPerPage = paginationModel.pageSize || 1;

    /**
    * @description Calculate the page based on the index.
    */

    const calculatedPage = Math.floor((index) / rowsPerPage);

    /**
    * @description Update the page in the paginationModel.
    */
    setPaginationModel({ ...paginationModel, page: calculatedPage });

}