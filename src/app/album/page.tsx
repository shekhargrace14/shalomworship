import AlbumSection from '@/components/AlbumSection';
import CardSection from '@/components/AlbumSection';
import Menu from '@/components/layout/Menu';
import Processor from '@/components/Processor';
import { fetchAlbums } from '@/lib/query/query';

const page = async () => {
    const album = await fetchAlbums();
    const songData = album[0];

    console.log("album data in album page:", album);
    return (
        <div>
            <div className="p-4">
                <Menu />
                <AlbumSection item={album} type="album"/>
                
            </div>

        </div>
    )
}

export default page