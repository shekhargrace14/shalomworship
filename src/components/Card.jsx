"use client";
import React from 'react'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link';
import Image from 'next/image'

const Card = ({item }) => {

    return (
        <>  
            <div className='   lg:block md:flex gap-2 items-[space-between] '>
                {/* <iframe width="100%" height="auto" src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                <div className='w-full md:w-1/2 lg:w-full rounded-lg overflow-hidden'>
                    {/* <iframe width="100%" height="215" src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    {/* <Image src={item.src} alt={item.title}/> */}
                    <Image src={item.image} alt={item.title || "Song Image"} width={700} height={500} />
                </div>

                <div className='w-full md:w-1/2 lg:w-full p-2'>

                    <Link href={`/song/${item.id}`}>
                        <div className=''>

                            <h3 className='line-clamp-2 text-lg mb-2 '>{item.title}</h3>
                            {/* <p className='flex items-center gap-1'>{item.artist}</p> */}
                            <p className=' line-clamp-2' dangerouslySetInnerHTML={{ __html: item.artist }} />
                            {/* <div className='line-clamp-2' dangerouslySetInnerHTML={{ __html: item.lyrics }} /> */}
                        </div>

                    </Link>
                    <p className='text-xs flex items-center gap-1'><FaUser /> {item.author}</p>
                    <p className='text-xs'>{item.published_date}</p>
                </div>
                {/* <div className='flex items-center gap-1' dangerouslySetInnerHTML={{ __html: item.lyrics }} /> */}

            </div>

        </>
    )
}

export default Card