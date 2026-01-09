import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "/img/logo/logo.webp";

const Header = () => {
  const formLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScuZXqjHCbrxu-rPmNFUopA_B-NS3YPqP_SIzTsjGXDwxyFCw/viewform";

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const categoriesItems = [
    { name: "Events", path: "/category/events" },
    { name: "Meet Up", path: "/category/meet-up" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle-btn")
      ) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCategoriesOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-menu-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileCategories = () => {
    setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg p-0 px-1"
        aria-label="Main navigation"
      >
        <div className="container d-flex align-items-center justify-content-between p-0">
          {/* Logo */}
          <div className="logo-s">
            <Link to="/" aria-label="Go to homepage" onClick={closeMobileMenu}>
              <img
                className="navbar-brand"
                src={logo}
                alt="Company Logo"
                width="150"
                height="auto"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button - Visible on tablet/mobile */}
          <button
            className="hamburger-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>

          {/* Navigation Links - Aligned to the right - Hidden on tablet/mobile */}
          <div className="navbar-nav-right d-flex flex-row align-items-center">
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="Share your story"
            >
              Share story
            </a>
            <Link
              to="/collections"
              className="nav-link"
              aria-label="Collections"
            >
              Collections
            </Link>
            <div className="dropdown-container" ref={dropdownRef}>
              <button
                type="button"
                className="nav-link dropdown-toggle-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
                aria-expanded={isCategoriesOpen}
                aria-haspopup="true"
                aria-label="Toggle categories menu"
              >
                Categories
                <svg
                  className={`dropdown-arrow ${isCategoriesOpen ? "open" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  {categoriesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="dropdown-item"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a
              className="header-btn"
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open invitation form in a new tab"
            >
              Invite us
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      >
        <div
          className={`mobile-menu-drawer ${isMobileMenuOpen ? "open" : ""}`}
          ref={mobileMenuRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <Link to="/" onClick={closeMobileMenu}>
                <div className="mobile-logo-circle"></div>
                <span className="mobile-logo-text">Founder Stories</span>
              </Link>
            </div>
            {/* <button
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button> */}
          </div>

          {/* Mobile Menu Links */}
          <div className="mobile-menu-links">
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Share story
            </a>
            <Link
              to="/collections"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Collections
            </Link>
            <button
              className="mobile-nav-link mobile-nav-link-button"
              onClick={toggleMobileCategories}
              aria-expanded={isMobileCategoriesOpen}
            >
              Categories
              <svg
                className={`mobile-categories-arrow ${
                  isMobileCategoriesOpen ? "open" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isMobileCategoriesOpen && (
              <>
                <Link
                  to="/category/events"
                  className="mobile-nav-link mobile-nav-link-indented"
                  onClick={closeMobileMenu}
                >
                  Events
                </Link>
                <Link
                  to="/category/meet-up"
                  className="mobile-nav-link mobile-nav-link-indented"
                  onClick={closeMobileMenu}
                >
                  Meet Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu CTA Button */}
          <div className="mobile-menu-footer">
            <a
              className="mobile-menu-btn"
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              Invite us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
