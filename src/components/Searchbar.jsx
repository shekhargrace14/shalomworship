"use client";

import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState();
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const [search, setSearch] = useState(true);
  const searchToggle = () => {
    setSearch(!search);
  };
  const pathname = usePathname();
  useEffect(() => {
    setSearchInput("");
  }, [pathname]);

  return (
    <>
      <div className=" flex items-center bg-[#1f1f1f]  rounded-lg py-2 px-4">
        {/* <IoIosSearch className="text-2xl" onClick={searchToggle} /> */}
        <input
          type="text"
          className=" w-[95%] px-4 bg-transparent outline-none border-none border-collapse "
          // className={`w-full px-4 bg-transparent outline-none border-none border-collapse ${search ? "hidden" : "sm:block"}`}
          placeholder="Search "
          value={searchInput}
          onChange={handleInputChange}
        />
        <IoIosClose
          className="text-2xl cursor-pointer"
          onClick={() => setSearchInput("")}
        />
      </div>
      <div className="absolute md:top-8 top-12 right-0 w-full">
        <Search data={searchInput} />
      </div>
    </>
  );
};

export default Searchbar;
