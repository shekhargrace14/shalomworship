"use client";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <header className="py-2 px-4 bg-black md:col-span-6 text-white sticky top-0 flex justify-between items-center gap-2">
      <div className="md:w-4/12 lg:w-3/12">
        <Link href="/">
          <IoMdHome className="text-4xl" />
        </Link>
      </div>
      <div className="md:relative w-10/12 sm:w-8/12 lg:w-5/12">
        <Searchbar />
      </div>
      {/* <Link href="/songDB"><div className="">  SongDB</div></Link> */}
      <div className="hidden lg:block md:w-4/12"></div>
    </header>
  );
};
export default Header;
