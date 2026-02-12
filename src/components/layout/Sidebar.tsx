"use client";

import React from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdHome } from "react-icons/io";
import Link from "next/link";
import { fetchArtists, useGetArtists} from "@/lib/query/query";
import Artist from "../shared/Artist";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const idDashboard = pathname.startsWith("/dashboard");
  const artists = useGetArtists();
  return (
    <nav className=" w-full flex gap-2 flex-col  bg-background rounded-lg ">
      <Link href="/" className="text-3xl block md:hidden">
        <IoMdHome />
      </Link>
      <section>
        <div className="px-2 mt-2">
          <Artist artists={artists.data ?? []} />
        </div>
      </section>
    </nav>
  );
};

export default Sidebar;
