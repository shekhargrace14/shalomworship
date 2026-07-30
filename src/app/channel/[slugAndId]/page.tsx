import InContentAd from '@/components/ads/InContentAd';
import { MetaData } from '@/components/MetaData';
import Processor from '@/components/Processor';

import Image from 'next/image';
import slugify from 'slugify';
import { notFound, redirect } from 'next/navigation';
import { parseSlugAndId } from '@/utils/parseSlugAndId';
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import { getAllChannelsBasic, getChannel } from '@/lib/static';
// import { getAllArtists, getAllArtistsBasic, getArtist } from "@/lib/static";

export async function generateStaticParams() {
  const channels = await getAllChannelsBasic();
  return channels.map((channel) => {
    const slugAndId = slugify(`${channel.title}`, { lower: true }) + '-' + channel.id.toString();
    return { slugAndId };
  });
}

export async function generateMetadata({ params }: any) {
  const slugAndId = await params.slugAndId;
  const { id } = parseSlugAndId(params.slugAndId);
  // const artist = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.public,]);
  const artist = await getChannel(id, [...CONTENT_VISIBILITY.public]);
  if (!artist) return {};
  const type = 'artist';
  const title = artist && artist?.title;
  // const metaDescription = artist && artist?.about;
  const slug = artist && artist?.slug;
  const image = artist && artist?.avatar;
  return MetaData({ type, title, slug, image });
}

const Page = async ({ params }: any) => {
  const slugAndId = await params.slugAndId;
  const { slug, id } = parseSlugAndId(params.slugAndId);
  // const artistData = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.public,]);
  const channelData = await getChannel(id, [...CONTENT_VISIBILITY.public]);
  const data = channelData;
  const color = channelData?.color ?? '#121212';
  const songs = data?.songs ? [...data.songs].reverse() : [];
  const hasSongs = songs.length > 0;
  // const upcomingSongs = await getChannel(id, [...CONTENT_VISIBILITY.upcoming]);
  // const upcomingSongsData = upcomingSongs?.songs ? [...upcomingSongs.songs] : [];

  return (
    <>
      <div className="bg-background  rounded-lg ">
        <div
          className="flex gap-4 p-4 mb-4 flex-col text-foreground w-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`,
          }}
        >
          {/* <InContentAd /> */}

          <div className=" flex items-center gap-4 w-full ">
            <div className="w-3/12 md:w-2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-card ">
              <Image src={data?.avatar || 'https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g'} alt={data?.title || 'Artist Image'} width={150} height={100} className="bg-card object-cover h-auto w-full" priority={true} />
            </div>
            <div className="sm:w-10/12 grid ">
              <h1 className="sm:text-4xl text-2xl font-semibold mb-1 text-foreground">{data?.title || 'Artist'}</h1>
            </div>
          </div>
          <div>
            <p className="text-base  text-foreground">About</p>
            <p className="text-sm  text-foreground">{/* {data?.about || "Artist"} */}</p>
          </div>
        </div>

        {/* {(upcomingSongsData?.length ?? 0) > 0 ? (
          <>
            <h2 className="text-xl font-semibold m-4 text-foreground">
              Upcoming Songs from {data?.title || "Artist"}
            </h2>

            <section className="w-full px-4">
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
                {upcomingSongsData.slice().reverse().map((item) => (
                  <div key={item.id}>
                    <Processor item={item?.id} type="artist" />
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null} */}

        {hasSongs ? <h2 className="text-xl font-semibold m-4 text-foreground">Songs from {data?.title || 'Artist'}</h2> : null}

        <section className="w-full px-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {songs.map((item) => (
              <div key={item.id}>
                <Processor item={item?.id} type="artist" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
