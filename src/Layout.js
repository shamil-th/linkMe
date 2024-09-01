import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Admin />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Layout;
