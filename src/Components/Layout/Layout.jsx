import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
