"use client";

import React, { useEffect, useState } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Search from "../ui/Search";
import { usePathname } from "next/navigation";
import SearchCopy from "../ui/Searchcopy";
import { Search as Sicon, Slash, X } from "lucide-react";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  // console.log(searchInput);
  
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
      <div className=" flex items-center bg-background border border-border dark: rounded-lg py-2 px-4">
        <input
          type="text"
          className=" w-[95%] text-sm text-foreground bg-transparent outline-none border-none border-collapse "
          // className={`w-full px-4 bg-transparent outline-none border-none border-collapse ${search ? "hidden" : "sm:block"}`}
          placeholder="Song, Artist, Category"
          value={searchInput}
          onChange={handleInputChange}
        />
        {searchInput.length <= 1 ? 
        <Sicon size={16} className="text-2xl text-foreground" onClick={searchToggle} />
        :
        <X size={16}
          className="text-2xl text-foreground cursor-pointer"
          onClick={() => setSearchInput("")}
        />
      }
      </div>
      <div className="absolute z-20 top-12 md:top-6 lg:top-10  right-0 w-full">
        <Search searchInput={searchInput} />
        {/* <SearchCopy/> */}
      </div>
    </>
  );
};

export default Searchbar;
