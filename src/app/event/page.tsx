import EventSection from '@/components/event/EventSection';
import Menu from '@/components/layout/Menu';
import { getAllAlbums } from '@/lib/static';
import { getAllEvents } from '@/lib/static';

const page = async () => {
    // const album = await fetchAlbums();
    const event = await getAllEvents();

    // console.log("event data in event page:", event);
    return (
        <div className="p-4">
            <Menu />
            <EventSection event={event} type="event" />
        </div>
    )
}
export default page