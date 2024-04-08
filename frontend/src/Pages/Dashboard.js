import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import ItemContext from "../context/Items/Itemcontext";
import Sidebar from "../components/Sidebar";
import Stock from "../components/Stock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Dashboard() {
  const constext = useContext(ItemContext);
  const { userrole, getUser, getItems, getUseditems, usedItems, items } =
    constext;
  let Navigate = useNavigate();

  const [swapt, setSwapt] = useState({
    btname: "items",
    tabledata: "useditems",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterData = (data) => {
    // Implement your filtering logic here
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUseditems();
      getItems();
      getUser();
      // console.log("object");
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };

  const shiftA = (change) => {
    if (change) {
      setSwapt({ btname: "items", tabledata: "useditems" });
    } else {
      setSwapt({ btname: "useditems", tabledata: "items" });
    }
  };

  //  console.log(userrole.username)
  return (
    <div className="container-fluid" style={{ backgroundColor: "#F0F0F0" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar username={userrole.username} />
        </div>

        {/* <!-- Page Content --> */}
        <div className="col-md-9">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="ms-auto d-flex align-items-center">
                {userrole.role === "admin" ? (
                  <>
                    <p className="container text-center text-primary h2">
                      {userrole.username}
                    </p>
                    <button
                      className="btn btn-success ms-2"
                      onClick={() => {
                        Navigate("/signup");
                      }}
                    >
                      Enroll
                    </button>
                  </>
                ) : (
                  <h1 className="container m-2 text-center text-primary">
                    {userrole.username}
                  </h1>
                )}
                <button className="btn btn-danger ms-2" onClick={handlelogout}>
                  Logout
                </button>
              </div>
            </div>
          </nav>

          {/* <!-- Content --> */}
          <div className="container">
            <h1 className="mt-4 text-center">Inventory Management Dashboard</h1>
            <div className="my-4">
              <Stock />
            </div>
            {/* Centered Table with Search Bar on the Right */}
            {userrole.role === "admin" ? (
              <div className="m-4 border rounded">
                <button
                  className="btn btn-warning container"
                  onClick={() => {
                    swapt.btname === "items" ? shiftA(false) : shiftA(true);
                  }}
                >
                  <h3 className="text-center m-2">
                    Change into {swapt.btname} table
                  </h3>
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-between mt-4">
              <div className="text-left">
                <h3>{swapt.tabledata === "items"?"Purchased Items":"Used Items"} log</h3>
              </div>
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
            <Table
              data={swapt.tabledata === "useditems" ? usedItems : items}
              hname={swapt.tabledata}
              filterData={filterData}
            />
          </div>
          {/* <!-- Your forms and other content go here --> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
