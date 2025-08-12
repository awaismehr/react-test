import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import "../add/add.scss";

interface EditProps {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
  onUpdate: (updatedProduct: any) => void;
}

const Edit = ({ slug, columns, setOpen, product, onUpdate }: EditProps) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
    setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "createdAt")
            .map((column) => {
              return (
                <div className="item" key={column.field}>
                  <label>{column.headerName}</label>
                  <input type="text" name={column.field} value={formData[column.field] || ""} onChange={handleChange} />
                </div>
              );
            })}
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
