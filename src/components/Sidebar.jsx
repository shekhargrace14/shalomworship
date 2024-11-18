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
    <div>
      <nav className=" lg:container mx-auto  p-4  h-[100vh] " >
        <div>
          <Link href="/">
            {/* <img className='cursor-pointer' src={logo} alt='logo' /> */}
            {/* <img className='cursor-pointer' src="" alt='logo'  onClick={()=> !toggleMenu ? setMenuOpen(true)   : setMenuOpen(false)  } /> */}
            SW
          </Link>
        </div>
        <div className="column flex items-center justify-between mt-8">
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
