import React from "react";

function Table(props) {
  const hdata = {
    items: [
      "name",
      "location",
      "quantity",
      "purchase_date",
      "purchased_by",
      "price",
      "store_name",
    ],
    useditems: ["name", "purpose", "useDate", "usedQuantity", "userName"],
  };
  const displayh = {
    items: [
      "Name",
      "Location",
      "Quantity",
      "Purchase Date",
      "Purchased User",
      "Price",
      "Store Name",
    ],
    useditems: ["Name", "Purpose", "Used Date", "Used Quantity", "User Name"],
  };
  const headers = hdata[props.hname];
  const Dheaders = displayh[props.hname];
  const bodys = props.filterData ? props.filterData(props.data) : props.data;
  return (
    <div
      className="d-flex justify-content-center mt-4"
      style={{ overflowY: "auto" }}
    >
      {/* Replace the following table with your actual table implementation */}
      <table
        className="table table-bordered table-hover table-secondary"
        style={{ backgroundColor: "transparent" }}
      >
        <thead>
          <tr>
            {Dheaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodys &&
            bodys
              .sort((a, b) => new Date(b.date) - new Date(a.date)) //sorting the data
              .map((body, index) => {
                return (
                  <tr key={index}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex}>{body[header]}</td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
