import React from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <MiddleBar />
      <Navbar />
    </div>
  );
};

export default Header;
