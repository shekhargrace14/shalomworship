// import { fetchArtistBySlug, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";
import { fetchArtistBySlug, fetchCategoryBySlug } from "@/lib/query/query";
import Card from "./ui/Card";
import { fetchCategoryBySlugWithSongs } from "@/lib/actions/fetchCategoryBySlugWithSongs";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";



const CategorySongs = async ({ params }: any) => {


  const id = params;
  const categoryData = await fetchCategoryBySlugWithSongs(id,[...CONTENT_VISIBILITY.public,] )
  const songs = categoryData[0]?.song
  // console.log(categoryData[0].song, "categoryData categoryData")

  return (
    // <>hello</>
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {songs.reverse().map((song, index) => (
          <div key={index}>
            <Processor item={song.songId} />
            {/* <Card item={song}/> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySongs;
