"use client";
import Link from "next/link";
import { IoMdClose, IoMdHome } from "react-icons/io";
import Searchbar from "../shared/Searchbar";
import { FaHamburger } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen((toggle) => !toggle)
  }
  return (
    <header className="h-full py-2 px-4 bg-background text-foreground  relative flex justify-between items-center gap-2 ">
      <div className="w-2/12 md:w-4/12 lg:w-3/12 bg-background">
        <Link href="/">
          <Image src="/White_logo_trim.webp" alt="logo" width={30} height={100} className="bg-black border-2 border-black" />
        </Link>
      </div>
      <div className="md:relative w-10/12 sm:w-8/12 lg:w-5/12">
        {/* <Link href="/search"> */}
        <Searchbar />
        {/* </Link> */}
      </div>
      {/* <Link href="/songDB"><div className="">  SongDB</div></Link> */}
      {/* <div className="hidden lg:block md:w-4/12 "> */}
      <div className="md:w-4/12 flex justify-end gap-4">
      <Button variant="outline" asChild>
        <Link href="/contribute">
        Contribute
        </Link>
        </Button>
        <ModeToggle />

      </div>
    </header>
  );
};
export default Header;
