import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import ConfirmationDialog from "../common/ConfirmationDialog";
import "./dataTable.scss";

interface DataTableProps {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onDelete: (id: number) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Koyu mod
  },
});

/**
 * dataTable component for displaying and managing data with actions.
 * @param props
 * @returns
 */
const DataTable: FC<DataTableProps> = (props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const onConfirm = () => {
    if (selectedId) props.onDelete(selectedId);
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const onCancel = () => {
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="actions">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="./view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDeleteClick(params.row.id)}>
            <img src="./delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
        <ConfirmationDialog open={confirmOpen} onCancel={onCancel} onConfirm={onConfirm} />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
