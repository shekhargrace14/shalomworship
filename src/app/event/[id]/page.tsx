import InContentAd from "@/components/ads/InContentAd";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { Button } from "@/components/ui/button";
import { getAlbum, getAllAlbums, getAllEvents, getEvent } from "@/lib/static";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export async function generateStaticParams() {
  const events = await getAllEvents(); // Fetch all songs from your data source
  return events.map(event => {
    const id = event.id.toString();
    return { id };
  });
}

// export async function generateMetadata({ params }: any) {
//   const id = await params.id; 
//   console.log(id)
//   const event = await getEvent(id);
//   const type = "event"
//   const title = event && event?.title
//   const slug = event && event?.slug
//   return MetaData({type, title, slug});
// }

const Page = async ({ params }: any) => {
  const { id } = await params

  const event = await getEvent(id)
  // console.log(event)
  const data = event;
  const date = new Date(data?.createdAt || "").toLocaleString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "numeric",
      // minute: "2-digit",
      // hour12: true,
    }
  )

  // const albumArtists = data?.artist[0]?.artist.title || [];
  // console.log(data, " album artists page data");
  // const slug = data?.artist[0].artist.slug + "-" + data?.artist[0].artist.id;

  return (
    <>
      {/* hello {data.name} */}
      <div className="bg-background  rounded-lg ">
        <div className="flex gap-4 mb-4 flex-col text-white w-full"

        >
          {/* <Menu /> */}
          {/* <InContentAd /> */}
          <div className="relative overflow-hidden rounded-xl">
            {/* Dynamic Image */}
            <Image
              src={data?.link || ""}
              alt={data?.title || ""}
              width={100}
              height={100}
              className="
              hidden sm:block
              object-center
                absolute inset-0
                h-full w-full
                object-cover
              "
            />

            {/* Gradient Overlay */}
            <div
              className="
                absolute inset-0 
                bg-gradient-to-r 
                from-black-900 from-10% 
                to-black-100 to-90%  
                from-black/100
                to-transparent 
                bg-top-left

              "
            />
            {/* Content */}
            <div className="relative z-10 p-6 text-white sm:pt-40 pb-4 ">
              <div className=" grid sm:grid-cols-[30%_70%] md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%] items-center gap-4">
                <div className="sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-card ">
                  <Image
                    src={data?.image || "https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g"}
                    alt={data?.title || "Artist Image"}
                    width={100}
                    height={100}
                    className="bg-card object-cover h-full w-full"
                    priority={true}
                  />
                </div>
                <div className="grid">
                  <h1 className="sm:text-4xl text-shadow-lg text-2xl font-semibold mb-1 text-foreground">
                    {data?.title || "Artist"}
                  </h1>
                  {/* <p className="text-sm  text-foreground"> {data?.artists[0]} </p> */}
                  <p className="text-base text-foreground text-shadow-2xs"> {date} </p>
                  <Button asChild className="w-fit bg-red-500 text-white mt-4 hover:bg-red-700">
                    <Link
                      href={data?.registration || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <h2 className="text-xl m-4 text-foreground">About The "<span className="font-semibold ">{data?.title || "Event"}" </span></h2> */}
        <section className="w-full px-4 mb-4">
          <div className="flex flex-col gap-4 ">
            {/* <p className="mb-4">Organisted by <span className="font-semibold "></span></p> */}
            <Image
              src={data?.link || ""}
              alt={data?.title || ""}
              width={100}
              height={100}
              className="
              object-center
                 inset-0
                h-full w-full
                object-cover
              "
            />
            <Button asChild className="w-fit bg-red-500 text-white mt-4 hover:bg-red-700">
              <Link
                href={data?.registration || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </Link>
            </Button>
          </div>
          {/* {data?.about} */}
          {/* {data?.registration} */}
          {/* {data?.venue} */}
        </section>
        {/* <Processor params={data.song} /> */}
      </div>
    </>
  );
};

export default Page;
