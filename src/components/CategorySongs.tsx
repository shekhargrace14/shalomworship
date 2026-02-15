import Processor from "@/components/Processor";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { getCategory } from "@/lib/static";

const CategorySongs = async ({ params }: any) => {
  const id = params;
  const categoryData = await getCategory(id,[...CONTENT_VISIBILITY.public,] )
  // console.log(categoryData,"categoryData")
  const songs = categoryData?.song

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {songs?.reverse().map((song, index) => (
          <div key={index}>
            <Processor item={song.song.id} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySongs;
