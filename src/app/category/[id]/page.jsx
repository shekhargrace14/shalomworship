import { fetchCategory, fetchCategoryBySlug } from "@/app/reactQuery/query";
import Menu from "@/components/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";

export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all songs from your data source
  return categories.map(category => ({
    id: category.id.toString(), // Convert to string if necessary
  }));
}

export async function generateMetadata({ params }) {
  const slugParams = await params.id;
  const category = await fetchCategoryBySlug(slugParams);
  const title = await category[0]?.name + " " + "Category"

  // console.log(category[0]);
  // const keyword = await song.keyword
  // const metaDescription = await song.metaDescription
  const slug = await category[0]?.slug
  const image = await category[0]?.image


  return await MetaData({ title, slug, image });
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
        <div className="p-4 pb-0 bg-[#1f1f1f]">
          <Menu />
        </div>
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
