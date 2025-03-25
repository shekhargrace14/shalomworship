import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetArtists } from "@/app/reactQuery/query";

const Artist = ({toggleMenu}) => {
  const artistData = useGetArtists();
  const urlSlug = usePathname();
  // console.log(artistData.data, "ArtistData log")  

  return (
    <section className="w-full flex flex-col gap-2">
      {artistData?.data?.length > 0 ? (
        artistData.data
          ?.slice()
          .reverse()
          .map((item) => (
            <Link key={item.id} href={`/artist/${item.slug}`} onClick={toggleMenu}>
              <div key={item.id}>
                <div
                  className={`rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000] ${
                    urlSlug.includes(item.slug)
                      ? "bg-[#2e2a2a]"
                      : "bg-[rgb(0,0,0)]"
                  }`}
                >
                  <div className="lg:container mx-auto p-2 flex gap-4">
                    <div className=" flex items-center md:w-2/12 rounded-full overflow-hidden sm:lg-0 md:mb-0">
                      <Image
                        // src="/user.png"
                        src={item?.image || "/user.png"}
                        alt={item?.title || "Artist Name" }
                        width={60}
                        height={60}
                        className=" object-cover h-full"
                        priority
                      />
                    </div>
                    <div className="md:w-10/12 flex flex-col justify-center">
                      <h3 className="line-clamp-1 font-semibold text-base text-white">
                        {item.name}
                      </h3>
                      <p className=" text-sm text-white">Artist</p>
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
export default Artist;
