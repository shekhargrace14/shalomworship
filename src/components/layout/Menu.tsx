import Link from 'next/link';
import React from 'react';

const Menu = () => {
  const menuItems = [
    // { title: "All", link: "/" },
    // { title: 'Setlist(Beta)', link: '/setlist' },
    { title: 'Setlist', link: '/user/setlist' },
    { title: 'Song', link: '/song' },
    { title: 'Channel', link: '/channel' },
    { title: 'Category', link: '/category' },
    { title: 'Album', link: '/album' },
    // { title: "Event", link: "/event" },
  ];

  return (
    <div className="  rounded-lg flex gap-2 overflow-scroll">
      {menuItems.map((menuItem, index) => (
        <Link href={menuItem.link} key={index}>
          <p className="bg-card/60 px-3  py-1 rounded-md  text-sm text-foreground ">{menuItem.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
