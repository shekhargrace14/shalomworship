import Menu from '@/components/layout/Menu';
import React from 'react';
import { MetaData } from '@/components/MetaData';
import ChannelSection from '@/components/channel/channel-section';
import { getAllChannels } from '@/lib/static';

export function generateMetadata() {
  const title = 'Channels';
  const slug = 'channels';
  const description = 'Explore various artists and their works on Shalom Worship.';
  const image = '';
  const keyword = ['Channels', 'Shalom Worship'];

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

  return (
    <div className="p-4">
      <Menu />
      <ChannelSection channels={channels} />
    </div>
  );
};

export default page;
