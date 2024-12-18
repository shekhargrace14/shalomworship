"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch, IoMdAdd, IoMdClose } from "react-icons/io";
import { LuLibrary } from "react-icons/lu";
import Search from "./Search";
import Artists from "./Artists";
import Category from "./Category";

const Sidebar = () => {
  const menu = [
    { pageName: "Home", path: "/" },
    { pageName: "Services", path: "/services" },
  ];

  return (
    <nav className="w-full p-2 mx-2 h-[90vh] bg-[#121212] rounded-lg  overflow-y-auto custom-scrollbar">
      {/* <div className=" rounded-lg absolute overflow-scroll"> */}
        {/* <Category/> */}
        <Artists/>   
      {/* </div> */}
    </nav>
  );
};
export default Sidebar;
