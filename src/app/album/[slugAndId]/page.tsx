import InContentAd from "@/components/ads/InContentAd";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { getAlbum, getAllAlbums } from "@/lib/static";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export async function generateStaticParams() {
  const artists = await getAllAlbums(); // Fetch all songs from your data source
  return artists.map(artist => {
    const slugAndId = slugify(`${artist.slug}`, { lower: true }) + '-' + artist.id.toString();
    return { slugAndId };
  });
}

export async function generateMetadata({ params }: any) {
  const slugAndId = await params.slugAndId; 
  const id = slugAndId.split('-').pop(); 
  const album = await getAlbum(id);
  const type = "album"
  const title = album && album?.title
  const slug = album && album?.slug
  return MetaData({type, title, slug});
}

const Page = async ({ params }: any) => {
  const slugAndId = params.slugAndId;
  const id = slugAndId.split('-').pop();
  const album = await getAlbum(id);
  const data = album;
  const albumArtists = data?.artist[0]?.artist.title || [];
  // console.log(data, " album artists page data");
  const slug = data?.artist[0].artist.slug + "-" + data?.artist[0].artist.id;

  return (
    <>
      {/* hello {data.name} */}
      <div className="bg-background  rounded-lg ">
        <div className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
          style={{
            // backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`
          }}>
          <Menu />
          <InContentAd />
          <div className=" flex items-center gap-4 w-full ">
            <div className="h-full w-3/12 md:w-2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-card ">
              <Image
                src={data?.image || "https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g"}
                alt={data?.title || "Artist Image"}
                width={150}
                height={100}
                className="bg-card object-cover h-full w-full"
                priority={true}
              />
            </div>
            <div className="sm:w-10/12 grid ">
              <h1 className="sm:text-4xl text-2xl font-semibold mb-1 text-foreground">
                {data?.title || "Artist"}
              </h1>
              <p className="text-sm  text-foreground">Album by  <Link href={`/artist/${slug}`}>{albumArtists}</Link> </p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold m-4 text-foreground">Songs from {data?.title || "Artist"}</h2>
        <section className="w-full px-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 ">
            {data?.song.map((item) => (
              <div key={item.songId}>
                <Processor item={item?.songId} type="album" />
              </div>
            ))}
          </div>
        </section>
        {/* <Processor params={data.song} /> */}
      </div>
    </>
  );
};

export default Page;
