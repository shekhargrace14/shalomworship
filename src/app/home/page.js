"use client";

import ArtistSection from "@/components/ArtistSection";
import CircleCard from "@/components/CircleCard";
import Menu from "@/components/Menu";
import TrendingSection from "@/components/TrendingSection";

const Page = () =>{
    return(
        <>
            <div className=" p-2  h-[90vh] overflow-y-auto custom-scrollbar ">
                <Menu/>
                <TrendingSection/>
                <ArtistSection/>
                <CircleCard/>
                <br/>

            </div>
        </>
    )
}
export default Page