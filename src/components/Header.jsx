"use client";
import Link from "next/link";
import { useState } from "react";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import Search from "./Search";

const Header = () => {
  const [searchInput, setSearchInput]=useState([])
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <div className="relative">
      <header className="py-2 bg-black text-white  relative flex justify-between items-center gap-4 ">
        <Link href="/">
          <IoMdHome className="text-4xl" />
        </Link>
        <div className="flex items-center  bg-slate-600 border-gray-100 border-1 rounded py-2 px-1">
          <input
            type="text"
            className="px-4 bg-transparent outline-none border-none border-collapse w-[500px]"
            placeholder="Search "
            value={searchInput}
            onChange={handleInputChange}
          />
          <IoIosSearch className="text-2xl" />
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full">Sign In</button>
          <button className="px-4 py-2 rounded-full">Log In</button>
        </div>
      </header>
      <Search className="absolute top-[1px] " data={searchInput}/>
    </div>
  );
};
export default Header;
