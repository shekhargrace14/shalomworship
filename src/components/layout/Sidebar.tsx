"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdHome } from "react-icons/io";
import Link from "next/link";
import Artist from "../shared/Artist";



const Sidebar = () => {
  return (
    // <nav className=" w-full flex gap-2 flex-col p-2 mx-2 h-[90vh]  bg-[#121212] rounded-lg overflow-y-auto custom-scrollbar ">
    <nav className=" w-full flex gap-2 flex-col mx-2  bg-[#121212] rounded-lg ">
      <Link href="/" className="text-3xl block md:hidden">
        <IoMdHome  />
      </Link>
      <section>
          <div className="h-[100vh]  overflow-y-auto custom-scrollbar px-2 mt-2">
            <Artist />
          </div>
      </section>
    </nav>
  );
};

export default Sidebar;
