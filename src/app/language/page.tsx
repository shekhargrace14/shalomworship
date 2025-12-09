import Menu from '@/components/layout/Menu';
import { fetchSongs } from '@/lib/query/query'
import { getLanguageName } from '@/utils/getLanguageName';
import Link from 'next/link';
import React from 'react'

const page = async () => {
  const songs = await fetchSongs()
  const data = [...new Set(songs.map((s) => s.language))];

  const langName = data.map(d => ({ "name": getLanguageName(d), "slug": d }))


  // console.log(data)  
  return (
    <div className='p-4'>
      <Menu />

      <div className="py-2 pt-2">
        <section className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-lg">
          {langName?.map((lang: any, index) => (
            <Link key={index} href={`/language/${lang.slug}`}>
              <div className="category-card h-16 flex justify-between items-end hover:bg-[#1f1f1f] px-2 py-2 rounded-lg text-shadow-lg/30 overflow-hidden" style={{
                backgroundImage: `linear-gradient(180deg, #a1a1a1, #00000030)`, // fallback to black or any second color
              }}>
                <h2 className="text-white text-base">{lang.name}</h2>
                {/* <p className="text-white text-sm">{category.song.length}</p> */}

              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

export default page