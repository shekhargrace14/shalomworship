"use client";

import { FaEye, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/app/context/DataContext";
import CircleCard from "@/components/CircleCard";

const Song = ({ params }) => {
    const { songData } = useContext(DataContext);
    console.log(songData);
    if (!songData || songData.length === 0) {
        return <p>No Song...</p>;
    }
    // let item = songData[params.id];
    let item = songData.find(s=>s.id==params.id)
    console.log("params", params.id);

    return (
        <>
            <div>
                <div className="bg-gray-800">
                    <div className=" lg:container mx-auto  py-4  gap-4 md:flex gap-4 text-white">
                        <div className="flex items-center md:w-4/12 h-full ">
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
                            <h1 className="md:text-2xl text-xl font-semibold">{item.id}</h1>
                            <p
                                className="sm:line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: item.artist }}
                            />
                            <p>Band : {item.band}</p>
                        </div>
                    </div>
                </div>
                <main className="lg:flex lg:container mx-auto  p-4 gap-4">
                    <section className="lg:w-12/12 w-full">
                        <h2 className="text-xl mb-2 font-semibold">{item.title}</h2>
                        <div
                            className="flex items-center gap-1"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div
                            className="flex items-center gap-1"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div
                            className="flex items-center gap-1"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div
                            className="flex items-center gap-1"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div className="border-t-[1px] border-b-[1px] border-gray p-2 my-4 flex justify-end gap-4">
                            <span className="flex items-center gap-2">
                                <FaEye /> {item.views}{" "}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaHeart /> {item.likes}{" "}
                            </span>
                        </div>
                        <CircleCard />
                    </section>
                </main>
            </div>
        </>
    );
};
export default Song;
