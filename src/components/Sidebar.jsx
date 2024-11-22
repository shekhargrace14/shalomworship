import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { LuLibrary } from "react-icons/lu";

const Sidebar = () => {
    const menu = [
        { pageName: "Home", path: "/" },
        { pageName: "Services", path: "/services" },
        
      ];
  return (
    <div className=" lg:container mx-auto  p-4   h-[100%]  bg-[#121212] rounded ">
      <nav className=" lg:container mx-auto  " >
        <div>
        </div>
        <div className="column flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <LuLibrary className="text-2xl" />
            <p>Your Library</p> 
          </div>
          <IoMdAdd className="text-2xl" />
          </div>
        <div className="column my-4 p-4 bg-[#1f1f1f] rounded-lg">
          <h4>Create Your First Playlist : Coming soon</h4>
          <p>Coming soon</p>
          <button >Coming soon</button>
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;
