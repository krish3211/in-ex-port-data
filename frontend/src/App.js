import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Itemstate from "./context/Items/Itemstate";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Itemstate>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Itemstate>
  );
}

export default App;
