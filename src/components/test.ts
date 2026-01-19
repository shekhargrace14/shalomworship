import { getYouTubeMetadata } from '@/lib/youtube'
import React from 'react'

const Test = async () => {
    const data =await getYouTubeMetadata("fuLijyQ5w0A")
    // console.log(data,"test data " )
  return ( "heelo")
}

export default Test