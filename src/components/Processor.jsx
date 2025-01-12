import { fetchSongById } from "@/app/reactQuery/query"
import Card from "./Card"



export default async function Processor({params}){
    // console.log(params,"Processor log props")
    const song = await fetchSongById(params)
    // console.log(song,"Processor log song")

    return(
        <>
         <Card item={song}/>
        </>
    )
}