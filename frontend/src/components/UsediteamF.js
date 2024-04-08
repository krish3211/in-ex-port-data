import React, { useContext, useState } from "react";
import ItemContext from "../context/Items/Itemcontext";

function UsediteamF() {
  const constext = useContext(ItemContext);
  const { stocks, usedstocks, adduseditem, showAlert } = constext;

  const [item, setItem] = useState({ name: "", purpose: "", usedQuantity: "", useDate: "" });

  const handlesubmit = (e) => {
    e.preventDefault();
    // Combine bought and used stocks
    const combinedStocks = [...stocks, ...usedstocks];

    // Create a map to store the total quantity for each item
    const totalQuantityMap = new Map();

    // Calculate total quantity for each item
    combinedStocks.forEach((item) => {
      if (totalQuantityMap.has(item.name)) {
        totalQuantityMap.set(item.name, totalQuantityMap.get(item.name) - item.totalQuantity);
      } else {
        totalQuantityMap.set(item.name, item.totalQuantity);
      }
    });

    // Prepare the result in the desired format
    const result = [];
    totalQuantityMap.forEach((totalQuantity, name) => {
      result.push({ name, totalQuantity });
    });

    const findTotalQuantityByName = (array, targetName) => {
      const item = array.find((obj) => obj.name === targetName);
      return item ? item.totalQuantity : null;
    };

    
    const totalQuantityForLEDS = findTotalQuantityByName(result, item.name.toLowerCase());
    if (totalQuantityForLEDS >= item.usedQuantity) {
      if (item.name === "" || item.purpose === "" || item.useDate === "" || item.usedQuantity === "") {
        showAlert("please fill and submit", "warning");
      } else {
        adduseditem(item.name.toLowerCase(), item.purpose, item.useDate, item.usedQuantity);
        setItem({ name: "", purpose: "", usedQuantity: "", useDate: "" });
      }
    }
    else{
      showAlert("items are unavaliable", "warning");
    }
  };

  const onchange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h5 className="text-center mb-4">Use Components</h5>
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
            name="purpose"
            placeholder="purpose to using"
            value={item.purpose}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="usedQuantity"
            placeholder="Enter the quantity"
            value={item.usedQuantity}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input type="date" className="form-control" name="useDate" value={item.useDate} onChange={onchange} />
        </div>
        <div className="mb-4">
          <button type="submit" className="btn btn-primary w-100" onClick={handlesubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsediteamF;
