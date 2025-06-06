import { fetchSongs } from "@/app/reactQuery/query"
import slugify from "slugify"
import React from 'react'
const RedirectUrl = async () => {
    const song = await fetchSongs()
    // console.log(song, "redirect data in testing page")
    

  return (
    <div>
        {
            song.map((item) => (
                <div key={item.id} className='text-white'>
                    <br></br>
                    source:<p>song/{item.slug}</p>
                    {/* <p>{item.id}-{slugify( item.title,{lower:true})}{item.content ? "-lyrics":""}</p> in future this will be used for slug in song page */}
                    destination:<p>/song/{slugify( item.title,{lower:true})}-{item.id}</p>
                    permanent: true,
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            ))

        }
    </div>
  )
}
export default RedirectUrl