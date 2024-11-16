import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/app/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';

const Search = ({ data }) => {
  const { songData } = useContext(DataContext);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (songData) {
      setSearchData(
        songData.filter(item =>
          item.title?.toLowerCase().includes(data?.toLowerCase())
        )
      );
    }
  }, [data, songData]);

  if (!data) return null; // Don't render anything if no search query

  return (
    <div className="bg-red-500">
      <section className="w-full my-4">
        <div>
          {searchData.length > 0 ? (
            searchData.map(item => (
              <Link href={`/song/${item.id}`} key={item.id}>  
              <div  className="bg-gray-800 mb-4">
                <div className="lg:container mx-auto py-4 gap-4 md:flex text-white">
                  <div className="flex items-center md:w-4/12 h-full">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.title || 'Song Image'}
                      width={700}
                      height={500}
                    />
                  </div>
                  <div className="md:w-8/12 grid">
                    <h1 className="md:text-2xl text-xl font-semibold">
                      {item.title || 'Unknown Title'}
                    </h1>
                    <h1 className="md:text-2xl text-xl font-semibold">{item.id}</h1>
                    <p
                      className="sm:line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.artist || 'Unknown Artist',
                      }}
                    />
                    <p>Band: {item.band || 'Unknown Band'}</p>
                    <p>Band: {item.conten || 'Unknown Band'}</p>
                  </div>
                </div>
              </div>
                </Link>

            ))
          ) : (
            <p className="text-white text-center">No results found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
