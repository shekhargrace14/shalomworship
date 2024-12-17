import { useGetSongs } from "@/fetch/songs";
import Image from "next/image";
import Link from "next/link";

const Artist = () => {
  const songs = useGetSongs();
  if (songs.isLoading) return <p>Loading Song...</p>;

  return (
    <section className="w-full flex flex-col-reverse gap-2">
      {songs.data.result.length > 0 ? (
        songs.data.result.map((item) => (
          <Link href={`/song/${item.id}_${item.seo.slug}`} key={item.seo.slug}>
            <div className=" rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000]">
              <div className=" lg:container mx-auto  p-2 md:flex gap-4 text-white ">
                <div className="bg-gray-300 flex items-center md:w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 mb-4 ">
                  <Image
                    src={item.image}
                    alt={item.title || "Song Image"}
                    width={700}
                    className="bg-gray-300 object-cover h-full"
                    height={100}
                    priority={100}
                  />
                </div>
                <div className="md:w-8/12 grid">
                  <h3 className="line-clamp-1 text-base">{item.title}</h3>
                  <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20">
                    <p className="leading-none text-sm">{item.creator}</p>
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
