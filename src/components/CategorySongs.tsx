// import { fetchArtistBySlug, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";
import { fetchArtistBySlug, fetchCategoryBySlug } from "@/lib/query/query";



const CategorySongs = async ({ params }: any) => {


  const id = params;
  const categoryData = await fetchCategoryBySlug(id);
  const data = categoryData?.[0] ?? { song: [] };

  return (
    // <>hello</>
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 ">
        {data.song.reverse().map((item) => (
          <div key={item.songId}>
            <Processor item={item.songId} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySongs;
