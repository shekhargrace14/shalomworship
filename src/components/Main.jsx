"use client";

import Link from "next/link";
import ArtistSection from "./ArtistSection";
import CircleCard from "./CircleCard"
import Menu from "./Menu";
import SongSection from "./SongSection";
import TrendingSection from "./TrendingSection";
import CategorySection from "./CategorySection";

const Main = () =>{
    return(
        <>
            <div className=" p-4  h-[90vh] overflow-y-auto custom-scrollbar ">
                <Menu/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Trending songs</Link> </h2>
                <TrendingSection number={"-8"} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"><Link href={"/artist"}>Your favorite artist</Link></h2>
                <ArtistSection number={"-12"} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/category"}>Category</Link></h2>
                <CategorySection number={"-8"}/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Latest song</Link></h2>
                <SongSection number={"-10"}/>
                <br/>

            </div>
        </>
    )
}
export default Main