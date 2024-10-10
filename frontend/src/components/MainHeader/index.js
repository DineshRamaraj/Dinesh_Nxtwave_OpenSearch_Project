import React, { useState } from "react";
import Header from "../Header";
import SideMenubar from "../SideMenuBar";

const MainHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  // console.log(showSidebar);
  return (
    <div>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <SideMenubar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default MainHeader;
