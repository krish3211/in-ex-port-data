import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import ItemContext from "../context/Items/Itemcontext";
import "react-toastify/dist/ReactToastify.css";
import logo from "../scrc-logo.png";
import config from "../config";

function Signup() {
  const [auth, setAuth] = useState({ username: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  let Navigate = useNavigate();
  const constext = useContext(ItemContext);
  const { getUser, userrole, showAlert } = constext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger the handleSubmit function when Enter key is pressed
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    if (userrole.role !== "admin") {
      Navigate("/");
    }
    if (auth.username === "" || auth.password === "" || auth.role === "") {
      // Handle the case where values are empty
      showAlert("Please fill in all fields", "warning");
    } else {
      e.preventDefault();
      const response = await fetch(
        `${config.API_BASE_URL}/api/auth/createcredentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: auth.username,
            password: auth.password,
            role: auth.role,
          }),
        }
      );
      const json = await response.json();
      if (json.status) {
        showAlert("Successfully created user", "success");
      } else {
        showAlert(json.error, "danger");
      }
    }
  };

  const onchange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
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
      <div className="d-flex align-items-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow">
                <div className="card-body">
                  <div className="text-center">
                    <img src={logo} alt="logo" className="img-thumbnail w-50" />
                  </div>
                  <h5 className="card-title text-center mb-4 mt-4">
                    <b>SIGNUP</b>
                  </h5>
                  <div className="form">
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={auth.username}
                        onKeyPress={handleKeyPress}
                        onChange={onchange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                       <div className="input-group mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={auth.password}
                        onKeyPress={handleKeyPress}
                        onChange={onchange}
                      />
                      <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                          >
                            {showPassword ? (
                              <EyeFill className="m-1" />
                            ) : (
                              <EyeSlashFill className="m-1" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="role"
                        onKeyPress={handleKeyPress}
                        onChange={onchange}
                      >
                        <option value="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onKeyPress={handleKeyPress}
                        onClick={handleSubmit}
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
