// "use client";

// import { FaEye, FaHeart } from "react-icons/fa";
// import Image from "next/image";
// import { useContext } from "react";
// import { DataContext } from "@/app/context/DataContext";
// import CircleCard from "@/components/CircleCard";
// import Head from "next/head";
// import Link from "next/link";


// const Song = ({ params }) => {
//   const { songData } = useContext(DataContext);
//   // console.log(songData);
//   if (!songData || songData.length === 0) {
//     return <p>No Song...</p>;
//   }
//   // let item = songData[params.slug];
//   let item = songData.find((s) => s.seo.slug == params.id);
//   // console.log("params", params.id);

//   return (
//     <>
//       <div>
//         <Head>
//           <title>hello seo</title>
//         </Head>
//         <div className="bg-[#1f1f1f] rounded-lg">
//           <div className=" lg:container mx-auto  p-4 md:flex gap-4 text-white ">
//             <div className="bg-gray-800 flex items-center md:w-4/12 rounded-lg overflow-hidden sm:lg-0 md:mb-0 mb-4 ">
//               <Image
//                 src={item.image}
//                 alt={item.title || "Song Image"}
//                 width={700}
//                 className="bg-gray-800 object-cover h-full w-full"
//                 height={100}
//               />
//             </div>
//             <div className="md:w-8/12 grid">
//               <h1 className="line-clamp-1 text-4xl md:text-4xl lg:text-5xl xl:text-6xl md:mt-12 mb-2  font-semibold">
//                 {item.title}
//               </h1>
//               <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20">
//                 <p className="font-bold leading-none">{item.creator} -</p>

//                 {item.artists.map((artist) => (
//                   <p key={artist.i} className="font-light text-sm leading-none">
//                     {artist},
//                   </p>
//                 ))}
//               </div>
//               {/* <p
//                 className="sm:line-clamp-2"
//                 dangerouslySetInnerHTML={{ __html: item.artist }}
//               /> */}
//               <div className="flex gap-4 text-sm mt-0">
//                 {/* <p>Author : {item.author.name}</p> */}
//                 <p>
//                   {item.published_date}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <main className="lg:flex lg:container mx-auto p-4 gap-4">
//           <section className="lg:w-12/12 w-full">
//             {/* <h2 className="text-xl mb-2 font-semibold">{item.title}</h2> */}
//             <div
//               className="flex items-center gap-1"
//               dangerouslySetInnerHTML={{ __html: item.content }}
//             />
//             <Link href={item.credits} target="_blank">
//               <p className="my-8 ">Credits - {item.creator}</p>
//             </Link>

//             {/* <CircleCard /> */}
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };



// export default Song;