import { Box } from "@mui/material";
import { FullFeaturedCrudGrid } from "./Grid/Grid.component.mbc"
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { handleCellFilter } from "./Utils/handler.column.id";
import { handleCellFilterDate } from "./Utils/handler.column.date";

export const App = () => {

  const dataGridColumns = [
    {
      field: "column1",
      headerName: "Text",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Type Text'}
        </strong>
      ),
      flex: 2,
      type: "text",
      editable: true,
      //search: handleCellFilter,
      id: "column1", // Unique ID for the "Text" column
    },
    {
      field: "column2",
      headerName: "Date",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Date Type'}
        </strong>
      ),
      flex: 2,
      type: "date",
      editable: true,
      search: handleCellFilterDate,
      id: "column2", // Unique ID for the "Date" column
    },
    {
      field: "column3",
      headerName: "Sigle-Select",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Select Type'}
        </strong>
      ),
      flex: 2,
      type: 'singleSelect',
      valueOptions: ['United Kingdom', 'Spain', 'Brazil'],
      editable: true,
      id: "selectColumn", // Unique ID for the "Select" column
    },
    {
      field: "column4",
      headerName: "Number",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Number Type'}
        </strong>
      ),
      flex: 2,
      type: 'number',
      editable: true,
      id: "numberColumn", // Unique ID for the "Number" column
    },
    {
      field: "column5",
      headerName: "Boolean",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Boolean Type'}
        </strong>
      ),
      type: 'boolean',
      flex: 2,
      editable: true,
      id: "booleanColumn", // Unique ID for the "Boolean" column
    },
    {
      field: "column6",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Non Editable Type'}
        </strong>
      ),
      headerName: "Text",
      flex: 2,
      editable: true,
      search: handleCellFilter,
      id: "nonEditableColumn", // Unique ID for the "Non Editable" column
    },
  ];



  const dataGridRows = [];

  const getRandomDate = (start: Date, end: Date) => {
    // Calculate the time range between the start and end dates in milliseconds
    const timeRange = end.getTime() - start.getTime();

    // Generate a random time within the time range and add it to the start date
    const randomTime = Math.random() * timeRange;
    const randomDate = new Date(start.getTime() + randomTime);

    // Set the time of the random date to midnight (00:00:00)
    randomDate.setHours(0, 0, 0, 0);

    return randomDate;
  }

  const startDate = new Date('01/01/2000'); // Adjust the start date as needed
  const endDate = new Date('12/31/2023'); // Adjust the end date as needed

  for (let i = 1; i <= 10000; i++) {
    dataGridRows.push({
      id: i,
      column1: `Column 1 - Row ${i}`,
      column2: getRandomDate(startDate, endDate),
      column3: `Spain`,
      column4: i * 100,
      column5: i % 2 === 0, // Alternating true and false
      column6: `Column 6 - Row ${i}`,
    });
  }

  return (
    <Box>

      <FullFeaturedCrudGrid _rows={dataGridRows} _columns={dataGridColumns} />

    </Box>
  )
}
