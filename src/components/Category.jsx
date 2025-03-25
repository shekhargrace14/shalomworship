import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetArtists, useGetCategory } from "@/app/reactQuery/query";

const Category = ({toggleMenu}) => {
  // const artistData = useGetArtists();
  const categoryData = useGetCategory();

  const urlSlug = usePathname();
  // console.log(categoryData.data, "categoryData log")  

  return (
    <section className="w-full flex flex-col gap-2">
      {categoryData?.data?.length > 0 ? (
        categoryData.data
          ?.slice()
          .reverse()
          .map((item) => (
            <Link key={item.id} href={`/category/${item.slug}`} onClick={toggleMenu}>
              <div key={item.id}>
                <div
                  className={`rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000] ${
                    urlSlug.includes(item.slug)
                      ? "bg-[#2e2a2a]"
                      : "bg-[rgb(0,0,0)]"
                  }`}
                >
                  <div className="lg:container mx-auto p-2 md:flex gap-4">
                    {/* <div className=" flex items-center md:w-2/12 rounded-full overflow-hidden sm:lg-0 md:mb-0 mb-4">
                      <Image
                        src={item?.image}
                        alt={item?.title || "Song Image"}
                        width={80}
                        height={80}
                        className="bg-gray-300 object-cover h-full"
                        priority
                      />
                    </div> */}
                    <div className="flex gap-2 items-center justify-between">
                      <h3 className="line-clamp-1 text-sm text-white">
                        {item.name}
                      </h3>
                      <p className=" text-sm text-white">({item.song.length})</p>
                      {/* <h3 className="line-clamp-1 text-sm">Artist</h3> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
      ) : (
        <p className="text-white text-center">No results found.</p>
      )}
    </section>
  );
};

export default Category;
