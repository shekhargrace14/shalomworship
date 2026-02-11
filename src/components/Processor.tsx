// import { fetchSongById, fetchSongBySlug } from "@/app/reactQuery/query"
import { fetchSongById } from "@/lib/query/query"
import Card from "./ui/Card"
import { Mastercard } from "./ui/mastercard"

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

export default async function Processor({item : songId, variant }:any){
    // console.log(item,"Processor log props")
    const item = await fetchSongById(songId)
    // console.log(song,"Processor log song")

    return(
        <>
        {/* <Card item={item}/> */}
        <Mastercard key={item?.id} id={item?.id} item={item} variant={variant} image={item?.image} title={item?.title} language={item?.language} slug={item?.slug}/>
        </>
    )
}