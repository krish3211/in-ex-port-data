import React, { useContext, useEffect, useState } from "react";
import ItemContext from "../context/Items/Itemcontext";
import { useNavigate } from "react-router-dom";

function Stock() {
  const constext = useContext(ItemContext);
  const {
    stocks,
    usedstocks,
    getStocks,
    getUsedstocks,
    location,
    getlocation,
  } = constext;
  let Navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getStocks();
      getUsedstocks();
      getlocation();
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Combine bought and used stocks
    const combinedStocks = [...stocks, ...usedstocks];

    // Create a map to store the total quantity for each item
    const totalQuantityMap = new Map();

    // Calculate total quantity for each item
    combinedStocks.forEach((item) => {
      if (totalQuantityMap.has(item.name)) {
        totalQuantityMap.set(
          item.name,
          totalQuantityMap.get(item.name) - item.totalQuantity
        );
      } else {
        totalQuantityMap.set(item.name, item.totalQuantity);
      }
    });

    // Prepare the result in the desired format
    const result = [];
    totalQuantityMap.forEach((totalQuantity, name) => {
      result.push({ name, totalQuantity });
    });

    // Sorting the result based on name alphabetically
    // result.sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Filter results based on search term
    const filteredResults = result.filter((item) => {
      if (
        searchTerm.includes(">") &&
        parseInt(searchTerm.slice(1)) < item.totalQuantity
      ) {
        return true;
      }
      if (
        searchTerm.includes("<") &&
        parseInt(searchTerm.slice(1)) > item.totalQuantity
      ) {
        return true;
      }
      if (
        searchTerm.includes(">=") &&
        parseInt(searchTerm.slice(2)) <= item.totalQuantity
      ) {
        return true;
      }
      if (
        searchTerm.includes("<=") &&
        parseInt(searchTerm.slice(2)) >= item.totalQuantity
      ) {
        return true;
      }
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredResult(filteredResults);
  }, [stocks, usedstocks, searchTerm]);

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="container" style={{ maxHeight: "300px", overflow: "auto" }}>
      <div className="d-flex justify-content-between mt-4">
        <div className="text-left">
          <h3>Stocks</h3>
        </div>
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      {location === undefined ? "":<table
        className="table table-sm table-bordered table-hover table-secondary mt-4"
        style={{ backgroundColor: "transparent" }}
      >
        <thead style={{ position: "sticky", top: "0", zIndex: "1" }}>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody style={{ overflowY: "auto" }}>
          { filteredResult.map((item, index) => (
            <tr
              key={index}
              className={item.totalQuantity <= 5 ? "table-danger" : ""}
            >
              <td onClick={() => copyToClipboard(item.name)}>{item.name}</td>
              <td>{location[item.name]}</td>
              <td>{item.totalQuantity}</td>
            </tr>
          ))}

          {/* <tr><td>re</td><td>ewr</td></tr> */}
        </tbody>
      </table>}
    </div>
  );
}

export default Stock;
