import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/layout/Menu";
import React from "react";


const page = () => {
  return (
    <div className=" h-[90vh] overflow-y-auto custom-scrollbar p-4">
      <Menu />
      <ArtistSection />
    </div>
  );
};

export default page;
