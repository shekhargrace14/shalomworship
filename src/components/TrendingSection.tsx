import React from "react";
import TrendingCard from "./TrendingCard";

type Props = {
  number: number;
  // songs: SongType[]; // Replace with your song type if defined
};
type Song = {
  id: string;
  name: string;
  image: string;
};

 const TrendingSection:React.FC<any> = ({number,songs}) => {
  const songData = songs || [];
  // console.log(songData, "TrendingSection")
  return (
    <section className='w-full my-4'>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2'>
        {songData?.slice(number).map((item: Song) => (
          <TrendingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
