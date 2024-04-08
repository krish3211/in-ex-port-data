import React from 'react';
import ErrorMessage from './ErrorMessage';

const AddInventoryForm = ({
    itemName,
    quantity,
    purchaseDate,
    purchasedBy,
    storeName,
    onItemNameChange,
    onQuantityChange,
    onPurchaseDateChange,
    onPurchasedByChange,
    onStoreNameChange,
    addItem,
    errorMessage,
}) => (
    <div>
        <h2>Add Purchased Components</h2>
        <input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={onItemNameChange}
        />
        <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={onQuantityChange}
            min="1"
        />
        <input
            type="date"
            value={purchaseDate}
            onChange={onPurchaseDateChange}
        />
        <input
            type="text"
            placeholder="Purchased By"
            value={purchasedBy}
            onChange={onPurchasedByChange}
        />
        <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={onStoreNameChange}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="centered-div">
            <button onClick={addItem} style={{"backgroundColor":"#81ccff" }}>Add Item</button>
        </div>
    </div>
);

export default AddInventoryForm;
