import React, { useState } from "react";
import ItemContext from "./Itemcontext";
import config from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Itemstate(props) {
  const host = config.API_BASE_URL;

  const [items, setItems] = useState([]);
  const [usedItems, setUsedItems] = useState([]);
  const [userrole, setUserrole] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [usedstocks, setUsedStocks] = useState([]);
  const [location, setLocation] = useState();
  // items list
  const getItems = async () => {
    const response = await fetch(`${host}/api/store/getitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setItems(json);
  };

  // --- useitem list

  const getUseditems = async () => {
    const response = await fetch(`${host}/api/store/getuseditem`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUsedItems(json);
  };

  // --- user role
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUserrole(json);
  };

  // ---add used item
  const adduseditem = async (name, purpose, useDate, usedQuantity) => {
    const response = await fetch(`${host}/api/store/used-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, purpose, useDate, usedQuantity }),
    });
    const item = await response.json();
    if (item.error) {
      showAlert(item.error, "danger");
    } else {
      showAlert("Successfully added used item", "success");
      setUsedItems(usedItems.concat(item));
    }
    getUsedstocks();
  };

  // ---add Purchased item

  const additem = async (
    name,
    location,
    quantity,
    purchase_date,
    purchased_by,
    store_name,
    price
  ) => {
    const response = await fetch(`${host}/api/store/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        location,
        quantity,
        purchase_date,
        purchased_by,
        store_name,
        price,
      }),
    });
    const item = await response.json();
    showAlert("Successfully added item", "success");
    setItems(items.concat(item));
    getStocks();
  };
  //  alert message
  // eslint-disable-next-line
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (type === "danger") {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // both are stocks present
  const getStocks = async () => {
    const response = await fetch(`${host}/api/store/totalquantity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setStocks(json);
  };
  const getUsedstocks = async () => {
    const response = await fetch(`${host}/api/store/totalusedquantity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUsedStocks(json);
  };
  const getlocation = async () => {
    const response = await fetch(`${host}/api/store/locationdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setLocation(json);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        userrole,
        usedItems,
        stocks,
        usedstocks,
        location,
        alert,
        getItems,
        getUser,
        getUseditems,
        additem,
        adduseditem,
        getStocks,
        getUsedstocks,
        showAlert,
        getlocation,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
}

export default Itemstate;
