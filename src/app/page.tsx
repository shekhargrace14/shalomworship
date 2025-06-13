import ArtistSection from "@/components/ArtistSection";
import CategorySection from "@/components/CategorySection";
import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import TrendingSection from "@/components/TrendingSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
    
            <div className=" p-4  h-[90vh] overflow-y-auto custom-scrollbar ">
                <Menu/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Trending songs</Link> </h2>
                <TrendingSection number={"-8"} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"><Link href={"/artist"}>Your favorite artist</Link></h2>
                <ArtistSection number={"-6"} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/category"}>Category</Link></h2>
                <CategorySection number={"-8"}/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Latest song</Link></h2>
                <SongSection number={"-10"}/>
                <br/>

            </div>
        </>
  );
}
