"use client"
import { DataContext } from '@/app/context/DataContext'
import React, { useContext } from 'react'


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

    </div>
  )
}

export default Song