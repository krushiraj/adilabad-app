import React from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

import { UserProvider } from "../contexts/user";

const Layout = ({ children }) => {
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </UserProvider>
  );
};

export default Layout;
