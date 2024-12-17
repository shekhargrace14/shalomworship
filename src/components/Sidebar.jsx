"use client";

import Artists from "./Artists";

const Sidebar = () => {
  const menu = [
    { pageName: "Home", path: "/" },
    { pageName: "Services", path: "/services" },
  ];

  return (
    <nav className="p-2 mx-2 h-[90vh] w-full bg-[#121212] rounded-lg  overflow-y-auto custom-scrollbar">
      {/* <div className=" rounded-lg absolute overflow-scroll"> */}
      {/* <Category/> */}
      <Artists />

      {/* </div> */}
    </nav>
  );
};

export default Sidebar;
