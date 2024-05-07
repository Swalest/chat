import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="ml-[256px] pt-[80px]">{children}</div>
    </div>
  );
};
