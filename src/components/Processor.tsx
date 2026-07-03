
import { getSong, getSongDisplay } from "@/lib/static";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { MasterCard } from "./mastercard";
import SongCard from "./song/song-card";

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
    const item = await getSongDisplay(id,[...CONTENT_VISIBILITY.discoverable]);
    return(
        <>
        <SongCard 
            key={item?.id} 
            id={item?.id} 
            item={item} 
            variant={variant} 
            image={item?.image ?? "" } 
            title={item?.title} 
            language={item?.language} 
            slug={item?.slug ?? ""}/>
        </>
    )
}