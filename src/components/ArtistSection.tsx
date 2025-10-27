import React from "react";
import ArtistCard from "./ArtistCard";

type Artist = {
  id: string;
  title: string;
  image: string;
};

const ArtistSection: React.FC<any> = ({number, artists}) => {

  // console.log("artists in artist section", artists);

  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
          {artists?.slice(number)
            .reverse()
            .map((item: Artist) => (
              <ArtistCard key={item.id} item={item} />
            ))}
        </div>
      </section>
    </>
  );
};

export default ArtistSection;
