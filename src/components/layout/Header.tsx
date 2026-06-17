"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import { HeaderSearch } from "../search/HeaderSearch";
import { Button } from "../ui/button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen((toggle) => !toggle)
  }
  return (
    <header className="w-full py-0 px-4  text-foreground  relative flex justify-between items-center gap-2 ">
      <div className="w-2/12 md:w-4/12 lg:w-3/12 ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={36} height={36} className="w-fit h-10 " />
        </Link>
      </div>
      <div className="md:relative w-10/12 sm:w-8/12 lg:w-5/12">
        {/* <Searchbar /> */}
        <HeaderSearch redirectCheck={true} />
      </div>
      <div className="md:w-4/12 flex justify-end items-center gap-4">
        <Link
          href="/submission"
          className="
            text-sm
            font-medium
            transition-colors
            hover:text-primary
            cursor-pointer
          "
        >
          <Button variant="outline">
            Contact Us
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
export default Header;
