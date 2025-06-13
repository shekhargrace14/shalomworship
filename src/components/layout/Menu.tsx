import Link from "next/link";
import React from "react";

const Menu = () => {
  const menuItems = [
    { title: "All", link: "/" },
    { title: "Song", link: "/song" },
    { title: "Artist", link: "/artist" },
    { title: "Category", link: "/category" },
  ];

  return (
    <div className="bg-[#1f1f1f]  rounded-lg flex gap-2">
      {menuItems.map((menuItem, index) => (
        <Link href={menuItem.link} key={index}>
            <p className="hover:bg-[#444444] bg-[#343434] px-4  py-1 rounded-xl  text-sm text-white">{menuItem.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
