import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import ItemContext from "../context/Items/Itemcontext";
import "react-toastify/dist/ReactToastify.css";
import logo from "../scrc-logo.png";
import config from "../config";

function Login() {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  let Navigate = useNavigate();
  const constext = useContext(ItemContext);
  const { showAlert } = constext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${config.API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: auth.username,
        password: auth.password,
      }),
    });
    const json = await response.json();
    if (json.status) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Successfully Login", "success");
      Navigate("/");
    } else {
      toast.warn(json.error, {
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
                    <b> LOGIN </b>
                  </h5>
                  <form onSubmit={handleSubmit} className="form">
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

                    <div className="mb-4">
                      <button type="submit" className="btn btn-primary w-100">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
