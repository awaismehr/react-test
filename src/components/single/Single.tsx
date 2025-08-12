import { useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Edit from "../edit/Edit";
import "./single.scss";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: { [key: string]: any };
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
  columns?: any[];
  onUpdate?: (updated: any) => void;
};

const Single = (props: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [product, setProduct] = useState({
    id: props.id,
    img: props.img,
    title: props.title,
    ...props.info,
  });

  const handleUpdate = (updatedProduct: any) => {
    setProduct(updatedProduct);
    if (props.onUpdate) props.onUpdate(updatedProduct);
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {product.img && <img src={product.img} alt="" />}
            <h1>{product.title}</h1>
            <button onClick={() => setOpenEdit(true)}>Update</button>
          </div>
          <div className="details">
            {Object.entries(product)
              .filter(([key]) => key !== "img" && key !== "id" && key !== "title")
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1]}</span>
                </div>
              ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line key={dataKey.name} type="monotone" dataKey={dataKey.name} stroke={dataKey.color} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {openEdit && props.columns && <Edit slug="product" columns={props.columns} setOpen={setOpenEdit} product={product} onUpdate={handleUpdate} />}
    </div>
  );
};

export default Single;
