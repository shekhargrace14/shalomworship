import Link from "next/link";
import React from "react";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarGroup,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar"

const Menu = () => {
  const menuItems = [
    // { title: "All", link: "/" },
    { title: "Setlist(Beta)", link: "/setlist" },
    { title: "Song", link: "/song" },
    { title: "Artist", link: "/artist" },
    { title: "Category", link: "/category" },
    // { title: "Language", link: "/language" },
    { title: "Album", link: "/album" },
  ];

  return (
    <div className="  rounded-lg flex gap-2 overflow-scroll">
      {menuItems.map((menuItem, index) => (
        <Link href={menuItem.link} key={index}>
            <p className="bg-card/60 px-3  py-1 rounded-md  text-sm text-foreground ">{menuItem.title}</p>
        </Link>
      ))}
    </div>

    // <Menubar>
    //   {menuItems.map((menuItem, index) => (
    //     <Link href={menuItem.link} key={index}>
    //       <MenubarMenu>
    //         <MenubarTrigger>{menuItem.title}</MenubarTrigger>

    //       </MenubarMenu>
    //     </Link>
    //   ))}

    // </Menubar>
  );
};

export default Menu;
