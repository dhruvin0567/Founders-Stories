import React from "react";
import { Link } from "react-router-dom";
import logo from "/img/logo/logo.webp";

const Header = () => {
  const formLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScuZXqjHCbrxu-rPmNFUopA_B-NS3YPqP_SIzTsjGXDwxyFCw/viewform";

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg p-0 px-1"
        aria-label="Main navigation"
      >
        <div className="container d-flex align-items-center justify-content-between p-0">
          {/* Logo */}
          <div className="logo-s">
            <Link to="/" aria-label="Go to homepage">
              <img
                className="navbar-brand"
                src={logo}
                alt="Company Logo"
                width="150"
                height="auto"
              />
            </Link>
          </div>

          {/* Invite Button */}
          <div className="mx-2">
            <a
              className="header-btn"
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open invitation form in a new tab"
            >
              Invite Us
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
