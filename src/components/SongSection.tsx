import React from "react";
import Card from "./ui/Card";

type Song = {
  id: string;
  name: string;
  image: string;
};
const SongSection: React.FC<any> = ({number,songs}) => {
  
  return (
    <>
        <section className='w-full my-2'>
          <div className='grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
            {songs?.slice(number).reverse().map((item: Song) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default SongSection;
