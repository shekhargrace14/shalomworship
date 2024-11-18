"use client";

import { FaEye, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/app/context/DataContext";
import CircleCard from "@/components/CircleCard";
import Head from "next/head";
import Link from "next/link";

const Song = ({ params }) => {
    const { songData } = useContext(DataContext);
    console.log(songData);
    if (!songData || songData.length === 0) {
        return <p>No Song...</p>;
    }
    // let item = songData[params.slug];
    let item = songData.find(s=>s.seo.slug==params.id)
    console.log("params", params.id);

    return (
        <>
        <Head>
        <title>{item.title}</title>
        <meta name="description" content={item.excerpt} />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.excerpt} />
        <meta property="og:image" content={item.image} />
        <meta property="og:url" content={`https://www.shalomworship.com/blog/${item.slug}`} />
      </Head>
            <div>
                <div className="bg-gray-800 rounded">
                    <div className=" lg:container mx-auto  p-2  gap-4 md:flex gap-4 text-white ">
                        <div className="flex items-center md:w-4/12 h-full rounded overflow-hidden sm:lg-0 mb-4">
                            <Image
                                src={item.image}
                                alt={item.title || "Song Image"}
                                width={700}
                                height={500}
                            />
                        </div>
                        <div className="md:w-8/12 grid">
                            <h1 className="md:text-2xl text-xl font-semibold">
                                {item.title}
                            </h1>
                            <p
                                className="sm:line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: item.artist }}
                            />
                            <p>Band : {item.band}</p>
                            <div className="flex gap-4">
                                <p>Author : {item.author.name}</p>
                                <p>Published : {item.published_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <main className="lg:flex lg:container mx-auto  sm:p-4 py-4 gap-4">
                    <section className="lg:w-12/12 w-full">
                        <h2 className="text-xl mb-2 font-semibold">{item.title}</h2>
                        <div
                            className="flex items-center gap-1"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />

                        <div className="border-t-[1px] border-b-[1px] border-gray p-2 my-4 flex justify-between gap-4">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-2">
                                    <FaEye /> {item.views}{" "}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaHeart /> {item.likes}{" "}
                                </span>
                            </div>
                        </div>
                        <Link href={item.credits} target="_blank"> Credits : {item.creator}</Link>
                        {/* <CircleCard /> */}
                    </section>
                </main>
            </div>
        </>
    );
};
export default Song;
