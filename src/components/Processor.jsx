import { fetchSongById, fetchSongBySlug } from "@/app/reactQuery/query"
import Card from "./Card"



export default async function Processor({item}){
    // console.log(item,"Processor log props")
    const song = await fetchSongById(item)
    // console.log(song,"Processor log song")

    return(
        <>
         <Card item={song}/>
        </>
    )
}