// import { fetchSongById, fetchSongBySlug } from "@/app/reactQuery/query"
import { fetchSongById } from "@/lib/query/query"
import Card from "./ui/Card"



export default async function Processor({item}:any){
    // console.log(item,"Processor log props")
    const song = await fetchSongById(item)
    // console.log(song,"Processor log song")

    return(
        <>
         <Card item={song}/>
        </>
    )
}