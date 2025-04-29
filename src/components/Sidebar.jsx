"use client";

import React, { useState } from "react";
import Artists from "./Artists";
import Category from "./Category"; // Ensure this is correctly imported
import { IoIosArrowDown, IoIosArrowUp, IoMdHome } from "react-icons/io";
import Link from "next/link";

const Sidebar = ({ toggleMenu }) => {
  const [artistsOpen, setArtistsOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);

  const toggleArtists = () => {
    setArtistsOpen((prevOpen) => !prevOpen);
  };

  const toggleCategory = () => {
    setCategoryOpen((prevOpen) => !prevOpen);
  };

  return (
    <nav className=" w-full flex gap-2 flex-col p-2 mx-2 h-[90vh]  bg-[#121212] rounded-lg overflow-y-auto custom-scrollbar ">
      <Link href="/" className="text-3xl block md:hidden">
        <IoMdHome onClick={toggleMenu}  />
      </Link>
      <section>
        {/* <div className="flex justify-between w-full bg-[rgb(0,0,0)] gap-4 rounded-lg px-4 py-2" onClick={toggleArtists}>
          <p className="text-base font-semibold text-white">Artist</p>
          <span
            className="text-xl text-white"
            
            role="button"
            aria-expanded={artistsOpen}
            aria-label="Toggle Category Section"
          >
            {!artistsOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </span>
        </div> */}

        {artistsOpen && <Category /> ? (
          <div className="h-[100vh]  overflow-y-auto custom-scrollbar px-4 mt-2">
            <Artists toggleMenu={toggleMenu} />
          </div>
        ) : (
          ""
        )}
        {/* <div className="pl-4 pt-2"> */}
        {/* </div> */}
      </section>
      {/* <section>
        <div className="flex justify-between w-full bg-[rgb(0,0,0)] gap-4 rounded-lg px-4 py-2" onClick={toggleCategory}>
          <p className="text-base font-semibold text-white ">Category</p>
          <span
            className="text-xl text-white"
            
            role="button"
            aria-expanded={categoryOpen}
            aria-label="Toggle Category Section"
          >
            {!categoryOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </span>
        </div>

        {categoryOpen && <Category /> ? (
          <div className="h-[60vh]  overflow-y-auto custom-scrollbar px-4 mt-2">

            <Category toggleMenu={toggleMenu}/>
          </div>
        ) : (
          ""
        )}

      </section> */}
    </nav>
  );
};

export default Sidebar;
