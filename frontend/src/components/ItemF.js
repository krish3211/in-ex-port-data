import React, { useContext, useState } from "react";
import ItemContext from "../context/Items/Itemcontext";

function ItemF(props) {
  const constext = useContext(ItemContext);
  const { additem, showAlert } = constext;
  const [item, setItem] = useState({
    name: "",
    location: "",
    quantity: "",
    purchase_date: "",
    purchased_by: "",
    price: "",
    store_name: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      item.name === "" ||
      item.quantity === "" ||
      item.purchase_date === "" ||
      item.location === "" ||
      item.price === "" ||
      item.store_name === ""
    ) {
      showAlert("please fill and submit", "warning");
    } else {
      additem(
        item.name.toLowerCase(),
        item.location,
        item.quantity,
        item.purchase_date,
        props.name,
        item.store_name,
        item.price
      );
      setItem({
        name: "",
        location: "",
        quantity: "",
        purchase_date: "",
        purchased_by: "",
        price: "",
        store_name: "",
      });
    }
  };
  const onchange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h5 className="text-center mb-4">Add Purchased Components</h5>
      <div className="form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter item name"
            value={item.name}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Enter item location"
            value={item.location}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="Enter item quantity"
            value={item.quantity}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="store_name"
            placeholder="Store Name"
            value={item.store_name}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="price"
            value={item.price}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            name="purchase_date"
            value={item.purchase_date}
            onChange={onchange}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handlesubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemF;
