import React, { useContext, useEffect } from "react";
import ItemF from "./ItemF";
import UsediteamF from "./UsediteamF";
import logo from "../scrc-logo.png";
import { useNavigate } from "react-router-dom";
import ItemContext from "../context/Items/Itemcontext";

function Sidebar(props) {
  const constext = useContext(ItemContext);
  const { userrole, getUser } = constext;
  let Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="border-end" style={{ Width: "300rem" }}>
      <div className="sidebar-heading border-bottom mb-4">
        <img src={logo} alt="logo" className="img-fluid" style={{ width: "50%", marginLeft: "25%" }} />
      </div>
      <div className="list-group list-group-flush vh-100" style={{ overflowY: "auto" }}>
        {userrole.role === "admin" ? (
          <>
            <div className="my-4">
              <ItemF name={props.username}/>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="my-4">
          <UsediteamF />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
