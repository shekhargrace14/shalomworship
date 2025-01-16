"use client";
import Link from "next/link";
import { IoMdClose, IoMdHome } from "react-icons/io";
import Searchbar from "./Searchbar";
import { FaHamburger } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
  const [menuOpen,setMenuOpen] = useState(false)
  const toggleMenu = () =>{
    setMenuOpen((toggle)=>!toggle)
  }
  return (
    <header className="py-2 px-4 bg-black text-white  relative flex justify-between items-center gap-2 ">
      <div className="hidden md:block md:w-4/12 lg:w-3/12">
        <Link href="/" className="text-3xl">
          <IoMdHome />
        </Link>
      </div>
      <div className="w-4/12 md:hidden ">
        <div href="/" className="text-3xl  " onClick={toggleMenu}>
          {!menuOpen ? <IoMenuSharp  />:<IoMdClose className="absolute z-20 top-3" />}
        </div>
        {menuOpen ? 
          <div className="w-10/12 absolute bg-black pt-14 pr-4 left-0 top-0 z-10">
            {/* <Sidebar/> */}
            <Sidebar id="sidebar-menu" toggleMenu={toggleMenu} />
          </div>
        
        :("")}
      </div>

      <div className="md:relative w-10/12 sm:w-8/12 lg:w-5/12">
        {/* <Link href="/search"> */}
            <Searchbar/>
        {/* </Link> */}

      </div>
      {/* <Link href="/songDB"><div className="">  SongDB</div></Link> */}
      <div className="hidden lg:block md:w-4/12"></div>
    </header>
  );
};
export default Header;
