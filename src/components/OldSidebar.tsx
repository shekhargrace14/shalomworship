"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Setlist from './setlist/Setlist'
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext'
import Create from './setlist/Create'

const OldSidebar = () => {
    const { setlists} = useSetlistsContext();
    return (
        <div className='p-4'>
            <Link href={`/setlist`}>
                <p className="text-xl mb-4 font-semibold">Setlists<span className="text-base text-muted-foreground">(beta)</span> </p>
            </Link>
            <Create/>
            
            <div className="flex flex-col gap-2 mt-4">
                {[...setlists].reverse().map((setlist,index) => (
                    <Setlist key={index} setlist={setlist} />
                ))}
            </div>
        </div>
    )
}

export default OldSidebar