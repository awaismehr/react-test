import React, { FC } from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./product-add-dialog.scss";
import { Product } from "../../../types/product";

interface ProductAddDialogProps {
  slug: string;
  columns: GridColDef<Product>[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductAddDialog: FC<ProductAddDialogProps> = ({ slug, columns, setOpen }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ProductAddDialog;
