import { fetchSeason } from '@/lib/query/query'
import React from 'react'

const page = async() => {
  const season =await fetchSeason()
  console.log(season, "season console")
  return (
    <div>season</div>
  )
}

export default page