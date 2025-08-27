import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const formLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScuZXqjHCbrxu-rPmNFUopA_B-NS3YPqP_SIzTsjGXDwxyFCw/viewform";

  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3">Founder Stories</h5>
            <p className="mb-3">
              Sharing inspiring journeys of entrepreneurs and innovators who are
              changing the world through their vision and determination.
            </p>
          </div>
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/meet-up" className="text-decoration-none">
                  Meet Ups
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/events" className="text-decoration-none">
                  Events
                </Link>
              </li>
              <li>
                <a
                  href={formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Invite Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-decoration-none"
              >
                <i className="bi bi-linkedin fs-4"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-decoration-none"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-decoration-none"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} Founder Stories. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0">
              <Link to="/" className="text-decoration-none me-3">
                Privacy Policy
              </Link>
              <Link to="/" className="text-decoration-none">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
