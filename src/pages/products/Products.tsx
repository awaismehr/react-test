import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";

import DataTable from "../../components/dataTable/DataTable";
import ProductAddDialog from "../../components/product/add/ProductAddDialog";
import { products as initialProducts } from "../../data";

import "./products.scss";
import { Product } from "types/product";

const columns: GridColDef<Product>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

export const Products = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(initialProducts);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={rows} onDelete={(id) => setRows((prev) => prev.filter((row: any) => row.id !== id))} />
      {open && <ProductAddDialog slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};
