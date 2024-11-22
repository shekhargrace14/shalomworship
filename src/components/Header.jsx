"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Header = () => {
  const [searchInput, setSearchInput]=useState()
  // const [searchState, setSearchState]=useState() 
  const handleInputChange = (event) => {
      setSearchInput(event.target.value);
      // setSearchState(event.target.value)
  };
  const [search,setSearch] = useState(true)
  const searchToggle = () =>{
    // if(searchState => 1){
      // setSearch(search)
    // }else{
      setSearch(!search)
    // }
  }
  const pathname = usePathname();
  useEffect(() =>{
    setSearchInput("")
  },[pathname])
  return (
    <div className="relative w-full ">
      <header className="py-2 px-4 bg-black text-white  relative flex justify-between items-center gap-4 ">
        <Link href="/">
          <IoMdHome className="text-4xl" />
        </Link>
        <div className="flex items-center bg-[#121212] border-gray-100 border-1 rounded py-2 px-1">
        {/* <div className=" lg:w-full sm:mw-fit flex items-center bg-slate-600 border-gray-100 border-1 rounded py-2 px-1"> */}
          <input
            type="text"
            className="px-4 bg-transparent outline-none border-none border-collapse "
            // className={`w-full px-4 bg-transparent outline-none border-none border-collapse ${search ? "hidden" : "sm:block"}`}
            placeholder="Search "
            value={searchInput}
            onChange={handleInputChange}

            
          />
          <IoIosSearch className="text-2xl" onClick={searchToggle}/>
        </div>
        <div className="flex items-center gap-4 hidden  bg-slate-300">
          <button className="px-4 py-2 rounded-full">Sign In</button>
          {/* <button className="px-4 py-2 rounded-full">Log In</button> */}
        </div>
      </header>
      <div  className="absolute right-0 ">
        <Search data={searchInput}/>
      </div>
    </div>
  );
};
export default Header;
