import React from 'react';

const copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };
  

const InventoryList = ({ items, searchText }) => (
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Available Quantity</th>
      <th>Purchased By</th>
      <th>Store Name</th>
      <th>Purchase Date</th>
    </tr>
  </thead>
  <tbody>
    {items
      .filter((item) => {
        const itemValues = Object.values(item).join('').toLowerCase();
        return itemValues.includes(searchText.toLowerCase());
      })
      .map((item, index) => (
        <tr key={index}>
          <td onClick={() => copyToClipboard(item.name)}>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.purchased_by}</td>
          <td>{item.store_name}</td>
          <td>{item.purchase_date}</td>
        </tr>
      ))}
  </tbody>
</table>

);

export default InventoryList;
