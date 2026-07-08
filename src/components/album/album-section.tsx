import React from 'react';
import Album from './album-card';

type Props = {
  id: string;
  title: string;
  image: string;
};

const AlbumSection: React.FC<any> = ({ number, album, type }) => {
  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 ">
          {album
            ?.slice(number)
            .reverse()
            .map((item: Props) => (
              <Album key={item.id} item={item} type={type} />
            ))}
        </div>
      </section>
    </>
  );
};

export default AlbumSection;
