import React from 'react';
import './UsedItemList.css';

const UsedItemList = ({ usedItems, searchText }) => (
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Used by</th>
      <th>Purpose</th>
      <th>Used Quantity</th>
      <th>Used Date</th>
    </tr>
  </thead>
  <tbody>
    {usedItems
      .filter((usedItem) => {
        const usedItemValues = Object.values(usedItem).join('').toLowerCase();
        return usedItemValues.includes(searchText.toLowerCase());
      })
      .map((usedItem, index) => (
        <tr key={index}>
          <td>{usedItem.name}</td>
          <td>{usedItem.userName}</td>
          <td>{usedItem.purpose}</td>
          <td>{usedItem.usedQuantity}</td>
          <td>{usedItem.useDate}</td>
        </tr>
      ))}
  </tbody>
</table>

);

export default UsedItemList;
