import { useState } from "react";
import Single from "../../components/single/Single";
import { singleProduct } from "../../data";
import { GridColDef } from "@mui/x-data-grid";
import "./product.scss";

// Reuse columns from products page for consistency
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params: any) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  { field: "title", type: "string", headerName: "Title", width: 250 },
  { field: "color", type: "string", headerName: "Color", width: 150 },
  { field: "price", type: "string", headerName: "Price", width: 200 },
  { field: "producer", headerName: "Producer", type: "string", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200, type: "string" },
  { field: "inStock", headerName: "In Stock", width: 150, type: "boolean" },
];

const Product = () => {
  const [product, setProduct] = useState({ ...singleProduct, ...singleProduct.info });

  const handleUpdate = (updated: any) => {
    setProduct((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="product">
      <Single {...product} columns={columns} onUpdate={handleUpdate} />
    </div>
  );
};

export default Product;
