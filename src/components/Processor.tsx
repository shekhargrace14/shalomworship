// import { fetchSongById, fetchSongBySlug } from "@/app/reactQuery/query"
import { Mastercard } from "./ui/mastercard"
import { getSong, getSongDisplay } from "@/lib/static";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";

type Song = {
  id: string;
  item: [];
  name: string;
  image: string;
  title: string;
  language: string;
  variant: string;
  slug: string;
};

export default async function Processor({item : id, variant }:any){
    // console.log(item,"Processor log props")
    const item = await getSongDisplay(id,[...CONTENT_VISIBILITY.discoverable]);
    // const item = await getSong(id,[...CONTENT_VISIBILITY.discoverable]);
    // console.log(item,"Processor log song")

    return(
        <>
        {/* <Card item={item}/> */}
        <Mastercard key={item?.id} id={item?.id} item={item} variant={variant} image={item?.image} title={item?.title} language={item?.language} slug={item?.slug}/>
        </>
    )
}