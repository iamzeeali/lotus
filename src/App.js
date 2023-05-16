import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Sidebar from "./components/Sidebar";
// import { Tracking } from "./components/Tracking";
// import Navbar from "./components/Navbar";
// import POConfirmation from "./components/POConfirmation";
import Login from "./components/Login";
import Report from "./components/Report";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/report" element={<Report />} exact />
      </Routes>
    </>
  );
};

export default App;
