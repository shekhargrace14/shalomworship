import InContentAd from "@/components/ads/InContentAd";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import {
  fetchArtistById,
  fetchArtists,
  fetchSongById,
} from "@/lib/query/query";
import Image from "next/image";
import slugify from "slugify";
import { notFound, redirect } from "next/navigation";
import { parseSlugAndId } from "@/utils/parseSlugAndId";
import { fetchArtistByIdWithSongs } from "@/lib/actions/fetchArtistByIdWithSongs";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";

export async function generateStaticParams() {
  const artists = await fetchArtists(); // Fetch all songs from your data source
  return artists.map((artist) => {
    const slug =
      slugify(`${artist.title}`, { lower: true }) + "-" + artist.id.toString();
    // console.log(slug, ""); // Log the slug here
    return { slug };
  });
}

export async function generateMetadata({ params }: any) {
  const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  //
  const { id } = parseSlugAndId(params.slugAndId);

  if (!id || !isValidObjectId(id)) {
    return {};
  }

  const artist = await fetchArtistByIdWithSongs(id, [
    ...CONTENT_VISIBILITY.public,
  ]);
  if (!artist) return {};
  console.log(artist);
  const type = "artist";
  const title = artist && artist?.title;
  const keyword = ["Yeshu"];
  const metaDescription = artist && artist?.about;
  const slug = artist && artist?.slug;
  // console.log(slug);
  const image = artist && artist?.image;

  return MetaData({ type, title, slug, image, keyword });
}

const isValidObjectId = (id: string) => /^[a-f0-9]{24}$/i.test(id);

const Page = async ({ params }: any) => {
  const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  // const id =  slugAndId.split('-').pop(); // extract id from slug-id
  const { slug, id } = parseSlugAndId(params.slugAndId);

  const artistData = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.public,]);

  if (!artistData) {
    const song = await fetchSongById(id);
    // console.log(song, "song in artist")
    if (song) {
      // redirect(`/song/${slugAndId}`)
      redirect(`/song/${slug}-${id}`);
    }
    notFound();
  }

  const data = artistData;
  const color = artistData?.color ?? "#121212"; // fallback color

  const upcomingSongs = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.upcoming,]);
  const upcomingSongsData = upcomingSongs?.song.map((song: any) => song);
  // console.log(data.song);
  // const publicSongs = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.public,]);
  // const publicSongsData = publicSongs?.song.map((song: any) => song);
  // console.log(publicSongsData, "publicSongsData")
  // console.log(upcomingSongsData, "upcomingSongsData")

  return (
    <>
      <div className="bg-background  rounded-lg ">
        <div
          className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`,
          }}
        >
          <Menu />
          <InContentAd />

          <div className=" flex items-center gap-4 w-full ">
            <div className="h-full w-3/12 md:w-2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-card ">
              <Image
                src={
                  data?.image ||
                  "https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g"
                }
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
            </div>
          </div>
          <div>
            <p className="text-base  text-foreground">About</p>
            <p className="text-sm  text-foreground">
              {data?.about || "Artist"}
            </p>
          </div>
        </div>

        {(upcomingSongsData?.length ?? 0) > 0 ? (
          <>
            <h2 className="text-xl font-semibold m-4 text-foreground">
              Upcoming Songs from {data?.title || "Artist"}
            </h2>

            <section className="w-full px-4">
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
                {(upcomingSongsData ?? []).slice().reverse().map((item) => (
                  <div key={item.songId}>
                    <Processor item={item?.songId} type="artist" />
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
        <h2 className="text-xl font-semibold m-4 text-foreground">
          Songs from {data?.title || "Artist"}
        </h2>

        <section className="w-full px-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {data?.song.reverse().map((item) => (
              <div key={item.songId}>
                <Processor item={item?.songId} type="artist" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
