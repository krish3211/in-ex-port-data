import React from "react";
import logo from "./scrc-logo.png";

function Form() {
  return (
    <div>
      <div>
        <h5 class="text-center mb-4">Use Components</h5>
        <div class="form">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              name="name"
              placeholder="Enter itema name"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="number"
              class="form-control"
              name="countiteam"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              name="Propuse"
              placeholder="propuse of using"
              required
            />
          </div>
          <div class="mb-4">
            <button type="submit" class="btn btn-primary w-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="d-flex justify-content-center mt-4">
      {/* Replace the following table with your actual table implementation */}
      <table
        className="table table-bordered table-hover table-secondary"
        style={{ backgroundColor: "transparent" }}
      >
        <thead>
          <tr>
            <th scope="col">Header 1</th>
            <th scope="col">Header 2</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            {/* Add more data cells as needed */}
          </tr>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            {/* Add more data cells as needed */}
          </tr>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            {/* Add more data cells as needed */}
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

function Dash() {
  return (
    <div>
      <div class="d-flex" style={{ backgroundColor: "#F0F0F0" }}>
        {/* <!-- Sidebar --> */}
        <div class="border-end" style={{ maxWidth: "300px" }}>
          <div class="sidebar-heading">
            <img
              src={logo}
              alt="logo"
              className="img-fluid"
              style={{ width: "50%", marginLeft: "25%" }}
            />
          </div>
          <div class="list-group list-group-flush vh-100 mt-4">
            <div class="m-4">
              <Form />
            </div>
            <div class="m-4">
              <Form />
            </div>
          </div>
        </div>

        {/* <!-- Page Content --> */}
        <div class="container-fluid">
          {/* <!-- Navbar --> */}
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <div class="ms-auto">
                <button class="btn btn-danger">Logout</button>
              </div>
            </div>
          </nav>

          {/* <!-- Content --> */}
          <div className="container">
            <h2 className="mt-4 text-center">Dashboard Content</h2>
            {/* Centered Table with Search Bar on the Right */}
            <div className="d-flex justify-content-between mt-4">
              <div className="text-left">
                <h3>Items</h3>
              </div>
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
            <Table />
            <div className="d-flex justify-content-between mt-4">
              <div className="text-left">
                <h3>Items</h3>
              </div>
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
            <Table />
          </div>
          {/* <!-- Your forms and other content go here --> */}
        </div>
      </div>
    </div>
  );
}

export default Dash;
