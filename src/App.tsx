import { GridColumnHeaderParams, GridValueGetterParams, GridValueSetterParams } from "@mui/x-data-grid";

import { Box } from "@mui/material";
import { FullFeaturedCrudGrid } from "./Grid/Grid.component.mbc"

export const App = () => {

  const dataGridColumns = [
    {
      field: "column1",
      headerName: "Text",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Non Editable Type'}
        </strong>
      ),
      flex: 2,
      type: "text",
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
    },
    {
      field: "column6",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Text Type'}
        </strong>
      ),
      headerName: "Text",
      flex: 2,
      editable: true,
    },
  ];

  const dataGridRows = [
    {
      id: 1,
      column1: "Compiled with two warning",
      column2: new Date('05/01/1999'),
      column3: "Brazil",
      column4: 1250,
      column5: true,
      column6: "Value 6",
    },
    {
      id: 2,
      column1: "Files successfully emitted",
      column2: new Date('08/08/1990'),
      column3: "Spain",
      column4: 2600,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 3,
      column1: "Issues checking in progress...",
      column2: new Date('10/01/2011'),
      column3: "Spain",
      column4: 7800,
      column5: false,
      column6: "Value 12",
    },
    {
      id: 4,
      column1: "No issues found.",
      column2: new Date('01/11/2023'),
      column3: "Brazil",
      column4: 1520,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 5,
      column1: "Grid/Key/key.down.page.context.tsx",
      column2: new Date('05/07/2006'),
      column3: "Brazil",
      column4: 5999,
      column5: false,
      column6: "Value 12",
    },
    {
      id: 6,
      column1: "Value 7",
      column2: new Date('05/01/1999'),
      column3: "Brazil",
      column4: 5999,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 7,
      column1: "Value 7",
      column2: new Date('05/01/1999'),
      column3: "Spain",
      column4: 5999,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 8,
      column1: "Value 7",
      column2: new Date('05/01/1999'),
      column3: "United Kingdom",
      column4: 5999,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 9,
      column1: "Value 7",
      column2: new Date('05/01/1999'),
      column3: "United Kingdom",
      column4: 5999,
      column5: true,
      column6: "Value 12",
    },
    {
      id: 10,
      column1: "Value 7",
      column2: new Date('05/01/1999'),
      column3: "Spain",
      column4: 5999,
      column5: true,
      column6: "Value 12",
    },
  ];

  return (
    <Box>
      <FullFeaturedCrudGrid _rows={dataGridRows} _columns={dataGridColumns} />
    </Box>
  )
}
