import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const DisplayOne = ({ data }) => {
  const urlSlug = usePathname()
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
    {songData.length > 0 ? (
      songData.map((item) => (
        <Link href={`/song/${item.seo.slug}`} key={item.id}>
          {/* <div className={`${item.seo.slug}={"/song/"${urlSlug}{} ? bg-[#c06767] : bg-[rgb(47,209,74)] rounded-lg hover:bg-[rgb(18,18,18)]`}> */}
          <div className="bg-[#1f1f1f] rounded-lg hover:bg-[rgb(18,18,18)]">
            <div className=" lg:container mx-auto flex  text-white ">
              <div className="bg-gray-300 flex items-center w-4/12 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title || "Song Image"}
                  width={700}
                  className="bg-gray-300 object-cover h-full"
                  height={100}
                />
              </div>
              <div className="w-8/12 flex items-center p-2">
                <h3 className="line-clamp-1 text-base">
                  {item.title}
                </h3>
                {/* <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20"> */}
                  {/* <p className="leading-none text-sm font-thin ">{item.creator}</p> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p className="text-white text-center">No results found.</p>
    )}
  </section>
  )
}

export default DisplayOne