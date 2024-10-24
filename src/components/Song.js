"use client"
import { DataContext } from '@/app/context/DataContext'
import React, { useContext } from 'react'
import CircleCard from './CircleCard'
import Card from './Card'

const Song = () => {
  const {songData} = useContext(DataContext)
  // console.log(songData)
  return (
    <div>
        <div className="banner">
            bannerrrrr
        </div>
        <div className="content">
            content
        </div>
        <CircleCard />
        <Card item={songData}/>

    </div>
  )
}

export default Song