// import AlbumSection from '@/components/AlbumSection';
import AlbumSection from '@/components/album/album-section';
import { getAllAlbums } from '@/lib/static';

const page = async () => {
  // const album = await fetchAlbums();
  const album = await getAllAlbums();

  // console.log("album data in album page:", album);
  return (
    <div>
      <div className="p-4">
        <AlbumSection album={album} type="album" />
      </div>
    </div>
  );
};

export default page;
