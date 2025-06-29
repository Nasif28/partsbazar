import React from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="flex flex-col">
      <TopBar />
      <MainHeader />
      <Navbar />
    </div>
  );
};

export default Header;
