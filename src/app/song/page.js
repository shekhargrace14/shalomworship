"use client"
import { DataContext } from '@/app/context/DataContext'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Sidebar from '@/components/Sidebar'
import React, { useContext } from 'react'


const Song = () => {
  const {songData} = useContext(DataContext)
  // console.log(songData)
  return (

          <Main/>
  
    
  );
}

export default Song