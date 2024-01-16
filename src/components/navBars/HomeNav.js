import React from "react";
import Logo from "../../img/logo.png";

const HomeNav = () => {
  return (
    // logo
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "2px solid #EBEBEB" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ paddingLeft: "7%" }}>
          <img
            src={Logo}
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </a>
      </div>
    </nav>
  );
};

export default HomeNav;
