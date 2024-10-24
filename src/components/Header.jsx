"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";

const Header = () => {

  return (
    <header className="py-2 bg-black text-white  relative flex justify-between items-center gap-4 ">
      <IoMdHome className="text-2xl"/>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full">Sign In</button>
        <button className="px-4 py-2 rounded-full">Log In</button>
      </div>
    </header>
  );
};

export default Header;
