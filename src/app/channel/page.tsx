import Menu from "@/components/layout/Menu";
import React from "react";
import { MetaData } from "@/components/MetaData";
import ChannelSection from "@/components/channel/channel-section";
import { getAllChannels } from "@/lib/static";




export function generateMetadata(){
  // const type = "artist"
  const title = "Artists";
  const slug = "artists";
  const description = "Explore various artists and their works on Shalom Worship.";
  const image = "";
  const keyword = ["Artists", "Shalom Worship"];

  return MetaData({
    // type,
    title,
    slug,
    image,
    keyword,
    metaDescription: description,
  });

}
const page = async () => {
  const channels = await getAllChannels();
  

  // console.log(artists, "fetched artists");

  return (
    <div className="p-4">
      <Menu />
      <ChannelSection channels={channels} />
    </div>
  );
};

export default page;
