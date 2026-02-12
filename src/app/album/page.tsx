import AlbumSection from '@/components/AlbumSection';
import CardSection from '@/components/AlbumSection';
import Menu from '@/components/layout/Menu';
import Processor from '@/components/Processor';
import { fetchAlbums } from '@/lib/query/query';
import { getAllAlbums } from '@/lib/static';

const page = async () => {
    // const album = await fetchAlbums();
    const album = await getAllAlbums();

    // console.log("album data in album page:", album);
    return (
        <div>
            <div className="p-4">
                <Menu />
                <AlbumSection album={album} type="album"/>
                
            </div>

        </div>
    )
}

export default page