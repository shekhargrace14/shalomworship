import Image from "next/image";
import Link from "next/link";
import React from "react";

const Social = () => {
  return (
    <div className="bg-[#40C351] py-2 px-4 inline-block rounded">
      <Link href="https://whatsapp.com/channel/0029Vaz9S3ULSmbinqpGry21" target="_blank" className="w-fit flex items-center gap-2">
      <Image
        src="/whatsapp.png"
        alt={"Whatsapp"}
        width={50}
        height={50}
        className="w-14"
        priority={true}
      /> 
      <div>
        <p className="text-white ">Get the latest Songs Update. <span className="underline">Join</span></p> 
        <p className="underline text-white"></p>
      </div>
    </Link>
    </div>
  );
};

export default Social;
