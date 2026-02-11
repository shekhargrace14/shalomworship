import React from "react";
import Card from "./ui/Card";
import { Mastercard } from "./ui/mastercard";

type Song = {
  id: string;
  item: [];
  name: string;
  image: string;
  title: string;
  language: string;
  variant: string;
  slug: string;
};
const SongSection: React.FC<any> = ({number,songs, variant}) => {
  return (
    <>
        <section className='w-full my-2'>
          <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
            {songs?.slice(number).reverse().map((item: Song) => (
              <Mastercard key={item.id} id={item.id} item={item} variant={variant} image={item.image} title={item.title} language={item.language} slug={item.slug}/>
            ))}
          </div>
        </section>
    </>
  );
};

export default SongSection;
