import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../scrc-logo.png';
import InventoryList from '../components/InventoryList';
import UsedItemList from '../components/UsedItemList';
import AddInventoryForm from '../components/AddInventoryForm';
import UseInventoryForm from '../components/UseInventoryForm';
import SearchInput from '../components/SearchInput';
import config from '../config';
import LogoutImage from '../img/logout.png';

function App() {
  const [items, setItems] = useState([]);
  const [usedItems, setUsedItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [purchasedBy, setPurchasedBy] = useState('');
  const [storeName, setStoreName] = useState('');

  const [useItemName, setUseItemName] = useState('');
  const [userName, setUserName] = useState('');
  const [usePurpose, setUsePurpose] = useState('');
  const [useQuantity, setUseQuantity] = useState(1);
  const [useDate, setUseDate] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInventory = () => {
    fetch(`${config.API_BASE_URL}/items`) // Replace with the actual endpoint URL
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching inventory:', error));
  };

  const fetchUsedItems = () => {
    fetch(`${config.API_BASE_URL}/used-items`) // Replace with the actual endpoint URL
      .then((response) => response.json())
      .then((data) => setUsedItems(data))
      .catch((error) => console.error('Error fetching used items:', error));
  };
  
  useEffect(() => {
    // Fetch inventory and used items from the API when the component mounts
    fetchInventory();
    fetchUsedItems();
  }, []);


  const addItem = () => {
    if (
      itemName.trim() !== '' &&
      quantity > 0 &&
      purchaseDate.trim() !== '' &&
      purchasedBy.trim() !== '' &&
      storeName.trim() !== ''
    ) {
      const newItem = {
        name: itemName,
        quantity: quantity,
        purchase_date: purchaseDate,
        purchased_by: purchasedBy,
        store_name: storeName,
      };

      fetch(`${config.API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setItems([...items, data]);
          setItemName('');
          setQuantity(1);
          setPurchaseDate('');
          setPurchasedBy('');
          setStoreName('');
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error adding item:', error);
          setErrorMessage('Failed to add item. Please try again.');
        });
    } else {
      setErrorMessage('Please fill in all required fields.');
    }
  };

  const useItem = () => {
    if (
      useItemName.trim() !== '' &&
      userName.trim() !== '' &&
      usePurpose.trim() !== '' &&
      useQuantity > 0 &&
      useDate.trim() !== ''
    ) {
      const usedItemData = {
        name: useItemName,
        userName: userName,
        purpose: usePurpose,
        usedQuantity: useQuantity,
        useDate: useDate,
      };

      fetch(`${config.API_BASE_URL}/used-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usedItemData),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsedItems([...usedItems, data]);
          fetchInventory();
          setUseItemName('');
          setUserName('');
          setUsePurpose('');
          setUseQuantity(1);
          setUseDate('');
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error using item:', error);
          setErrorMessage('Failed to use item. Please try again.');
        });
    }
  };

  
  return (
    <div className="App">
  <header className='header'>
    <img src={logo} alt="Logo" className="logo" />

  <h1>Inventory Management</h1>
  <img src={LogoutImage} alt="logout" onClick={()=>{
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }} style={{"width":"30px"}}></img>
  </header>
<div className='content'>
    <div className="left-panel">
      <AddInventoryForm
        itemName={itemName}
        quantity={quantity}
        purchaseDate={purchaseDate}
        purchasedBy={purchasedBy}
        storeName={storeName}
        onItemNameChange={(e) => setItemName(e.target.value)}
        onQuantityChange={(e) => setQuantity(e.target.value)}
        onPurchaseDateChange={(e) => setPurchaseDate(e.target.value)}
        onPurchasedByChange={(e) => setPurchasedBy(e.target.value)}
        onStoreNameChange={(e) => setStoreName(e.target.value)}
        addItem={addItem}
        errorMessage={errorMessage}
      />
      <UseInventoryForm
        useItemName={useItemName}
        userName={userName}
        usePurpose={usePurpose}
        useQuantity={useQuantity}
        useDate={useDate}
        onUseItemNameChange={(e) => setUseItemName(e.target.value)}
        onUserNameChange={(e) => setUserName(e.target.value)}
        onUsePurposeChange={(e) => setUsePurpose(e.target.value)}
        onUseQuantityChange={(e) => setUseQuantity(e.target.value)}
        onUseDateChange={(e) => setUseDate(e.target.value)}
        useItem={useItem}
        errorMessage={errorMessage}
      />
    </div>
    <div className="right-panel">
      <div className="centered-div">
        <h2>Available Components</h2>
        <SearchInput
          searchText={searchText}
          onSearchTextChange={(e) => setSearchText(e.target.value)}
        />
        <InventoryList items={items} searchText={searchText} />
      </div>
      <div className="centered-div">
        <h2>Used Components</h2>
        <UsedItemList usedItems={usedItems} searchText={searchText} />
      </div>
      </div>
    </div>
</div>
);
}

export default App;
