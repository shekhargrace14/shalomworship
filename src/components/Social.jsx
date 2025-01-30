import Image from "next/image";
import Link from "next/link";
import React from "react";

const Social = () => {
  return (
    <Link href="https://whatsapp.com/channel/0029Vaz9S3ULSmbinqpGry21" target="_blank">
    <div className="py-4 flex items-center gap-2">
      <Image
        src="/whatsapp.png"
        alt={"Whatsapp"}
        width={50}
        height={50}
        className=""
        priority={100}
      /> 
      <div>
        <p>Join the Whatsapp Channel</p> 
        <p className="underline">Click here to Join</p>
      </div>
    </div>
    </Link>
  );
};

export default Social;
