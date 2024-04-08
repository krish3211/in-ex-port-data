import React from 'react';
import ErrorMessage from './ErrorMessage';

const UseInventoryForm = ({
    useItemName,
    userName,
    usePurpose,
    useQuantity,
    useDate,
    onUseItemNameChange,
    onUserNameChange,
    onUsePurposeChange,
    onUseQuantityChange,
    onUseDateChange,
    useItem,
    errorMessage,
}) => (
    <div>
        <h2>Use Components</h2>
        <input
            type="text"
            placeholder="Enter item name to use"
            value={useItemName}
            onChange={onUseItemNameChange}
        />
        <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={onUserNameChange}
        />
        <input
            type="text"
            placeholder="Purpose of Use"
            value={usePurpose}
            onChange={onUsePurposeChange}
        />
        <input
            type="number"
            placeholder="Quantity to Use"
            value={useQuantity}
            onChange={onUseQuantityChange}
            min="1"
        />
        <input
            type="date"
            placeholder="Date of Use"
            value={useDate}
            onChange={onUseDateChange}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="centered-div">
            <button onClick={useItem} style={{"backgroundColor":"#81ccff" }}>Use Item</button>
        </div>
    </div>
);

export default UseInventoryForm;
