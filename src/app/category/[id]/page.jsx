import { fetchCategory, fetchCategoryBySlug } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";

export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all songs from your data source
  return categories.map(category => ({
    id: category.id.toString(), // Convert to string if necessary
  }));
}

const Page = async ({ params }) => {
  const categorySlug = params.id;
  const categoryData = await fetchCategoryBySlug(categorySlug);
  const data = categoryData[0];

//   console.log(categorySlug, "category page id");
//   console.log(categoryData, "categoryData  page data");
//   console.log(data.song, "categoryData song page data");
  return (
    <>
      <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
          <div className=" flex items-center gap-4 w-full ">
            <div className="sm:w-8/12 grid">
              <h1 className="sm:text-4xl text-4xl font-semibold mb-1 text-white">
                {data?.name}{" "}
              </h1>
              <p className="text-sm  text-white">Category</p>
            </div>
          </div>
        </div>
          <h2 className="text-xl font-semibold m-4 text-white">Songs on {data?.name}{" "}Category</h2>
        <section className="w-full">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 ">
            {data?.song.map((item) => (
              <div key={item.songId}>
                <Processor item={item.songId} />
              </div>
            ))}
          </div>
        </section>
        {/* <Processor params={data.song} /> */}
      </div>
    </>
  );
};

export default Page;
