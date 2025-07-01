import React from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
      <TopBar />
      <MiddleBar />
      <Navbar />
    </div>
  );
};

export default Header;
