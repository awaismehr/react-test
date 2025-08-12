import { useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GridColDef } from "@mui/x-data-grid";

import { singleProduct } from "../../data";
import ProductEditDialog from "../../components/product/edit/ProductEditDialog";
import "./product.scss";
import { Product } from "types/product";

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

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product>(singleProduct);
  const [openEdit, setOpenEdit] = useState(false);

  const handleUpdate = (updated: any) => {
    setProduct((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="product">
      <div className="single">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              {product?.img && <img src={product?.img} alt="" />}
              <h1>{product?.title}</h1>
              <button onClick={() => setOpenEdit(true)}>Update</button>
            </div>
            <div className="details">
              {/* Show only the basic product properties, matching the form */}
              {columns
                .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "createdAt")
                .map((column) => (
                  <div className="item" key={column.field}>
                    <span className="itemTitle">{column.headerName}</span>
                    <span className="itemValue">{(product as any)[column.field]}</span>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          {singleProduct?.chart && (
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={singleProduct?.chart?.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {singleProduct?.chart?.dataKeys.map((dataKey) => (
                    <Line key={dataKey.name} type="monotone" dataKey={dataKey?.name} stroke={dataKey?.color} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="activities">
          <h2>Latest Activities</h2>
          {singleProduct?.activities && (
            <ul>
              {singleProduct?.activities.map((activity) => (
                <li key={activity?.text}>
                  <div>
                    <p>{activity?.text}</p>
                    <time>{activity?.time}</time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {openEdit && columns && <ProductEditDialog slug="product" columns={columns} setOpen={setOpenEdit} product={product} onUpdate={handleUpdate} />}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
