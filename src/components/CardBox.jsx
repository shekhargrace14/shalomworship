"use client";
import React from "react";


const CardBox = ({data}) => {
  console.log(data, "CardBox props");
  // const songData = useGetCreatorById(data)
  // console.log(allCreatorData.data, "allCreatorData data");
  // console.log(CreatorData.data, "CreatorData data");

  // if (!songData || songData.length === 0) {
  //   return <p>No Song...</p>;
  // }
  return (
    <>
        <section className='w-full'>
          <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 '>
            {/* {data?.slice().reverse().map(item => ( */}
              {/* <Card item={item} key={item.id}/> */}
            {/* ))} */}
          </div>
        </section>
    </>
  );
};
export default CardBox;
