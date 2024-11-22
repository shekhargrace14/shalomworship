"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosClose, IoIosSearch, IoMdHome } from "react-icons/io";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Header = () => {
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
    <header className="py-2 px-4 bg-black text-white  relative flex justify-between items-center gap-2 ">
      <div className="w-3/12 ">
        <Link href="/">
          <IoMdHome className="text-4xl" />
        </Link>
      </div>

      <div className="relative w-10/12 sm:w-6/12 md:w-4/12 ">
        <div className=" flex items-center bg-[#1f1f1f]  rounded-lg py-2 px-4">
        <IoIosSearch className="text-2xl" onClick={searchToggle} />
          <input
            type="text"
            className=" w-[95%] px-4 bg-transparent outline-none border-none border-collapse "
            // className={`w-full px-4 bg-transparent outline-none border-none border-collapse ${search ? "hidden" : "sm:block"}`}
            placeholder="Search "
            value={searchInput}
            onChange={handleInputChange}
          />
          <IoIosClose className="text-2xl cursor-pointer" onClick={()=>(setSearchInput(""))} />
        </div>
        <div className="absolute top-8 w-full">
          <Search data={searchInput} />
        </div>
      </div>

      <div className="hidden md:block bg-slate-300 w-5/12"></div>
    </header>
  );
};
export default Header;
