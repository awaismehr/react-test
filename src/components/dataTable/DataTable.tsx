import { Link } from "react-router-dom";
import "./dataTable.scss";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Koyu mod
  },
});

import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onDelete: (id: number) => void;
};

const DataTable = (props: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (deleteId !== null) {
      props.onDelete(deleteId);
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
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
        <ConfirmDialog open={confirmOpen} onCancel={handleCancel} onConfirm={handleConfirm} />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
