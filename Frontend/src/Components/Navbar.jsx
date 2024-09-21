import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <ul style={{ display: "flex", listStyle: "none", justifyContent: "space-around" }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
        <li><Link to="/betting" style={{ color: "white", textDecoration: "none" }}>Betting</Link></li>
        <li><Link to="/settings" style={{ color: "white", textDecoration: "none" }}>Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
