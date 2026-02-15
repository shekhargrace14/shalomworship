"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import { HeaderSearch } from "../search/HeaderSearch";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen((toggle) => !toggle)
  }
  return (
    <header className="h-full py-2 px-4 bg-background text-foreground  relative flex justify-between items-center gap-2 ">
      <div className="w-2/12 md:w-4/12 lg:w-3/12 bg-background">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={36} height={36} className="w-fit h-10 " />
        </Link>
      </div>
      <div className="md:relative w-10/12 sm:w-8/12 lg:w-5/12">
        {/* <Searchbar /> */}
        <HeaderSearch/>
      </div>
      <div className="md:w-4/12 flex justify-end gap-4">
        <ModeToggle />
      </div>
    </header>
  );
};
export default Header;
