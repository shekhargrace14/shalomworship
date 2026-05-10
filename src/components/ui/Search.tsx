// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import slugify from "slugify";
// import { useSongSearch } from "@/lib/search/useSongSearch";

// const Search = ({ query }: { query: string }) => {
//   const { search } = useSongSearch();
//   const results = search(query);
//   return (
//     <>
//       {query?.trim() ? (
//         <section className="bg-card rounded-md max-h-[86vh] overflow-y-auto custom-scrollbar ">
//           {results.length > 0 ? (
//             results.map(item => (
//               <Link
//                 href={
//                   item.type === "category"
//                     ? `/category/${slugify(item.title, { lower: true })}`
//                     : `/${item.type}/${slugify(item.title, { lower: true })}-${item.id}`
//                 }
//                 key={item.type + item.id}
//               >
//                 <div className="bg-card gap-2">
//                   <div className="lg:container mx-auto p-2 flex gap-4 text-foreground">
//                     <div className=" flex items-center justify-center w-4/12 md:w-3/12 rounded overflow-hidden sm:lg-0 md:mb-0 ">
//                       {/* {!item.image ? {item?.color} : */}
//                       {!item.image ? "" :
//                         <Image
//                           src={item.image || '/default-song-image.jpg'}
//                           alt={item.title || "Image"}
//                           width={500}
//                           className="w-fit h-fit md:h-20 bg-gray-800 object-cover "
//                           height={100}
//                         />
//                       }
//                     </div>
//                     <div className="w-6/12 flex flex-col justify-center ">
//                       <h2 className="line-clamp-1 text-foreground text-base md:text-base font-medium">
//                         {item.title}
//                       </h2>
//                       <span className="text-xs text-foreground">{item.type}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className="rounded min-w-full px-4 py-2 text-foreground bg-destructive ">
//               <p className="text-foreground text-center">No results found. </p>
//             </div>
//           )}
//         </section>
//       ) : null}
//     </>
//   );
// };

// export default Search;