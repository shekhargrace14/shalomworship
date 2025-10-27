import React from "react";
import ArtistCard from "./ArtistCard";
import Card from "./ui/Card";
import Album from "./Album";

type Artist = {
  id: string;
  title: string;
  image: string;
};

const AlbumSection: React.FC<any> = ({number, item, type}) => {

  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
          {item?.slice(number)
            .reverse()
            .map((item: Artist) => (
              <Album key={item.id} item={item} type={type} />
            ))}
        </div>
      </section>
    </>
  );
};

export default AlbumSection;
