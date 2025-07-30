import { fetchSeason } from '@/lib/query/query'
import React from 'react'

const page = () => {
  const season = fetchSeason()
  console.log(season, "season console")
  return (
    <div>season</div>
  )
}

export default page