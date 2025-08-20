
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { fetchCategory, fetchCategoryBySlug } from "@/lib/query/query";
import slugify from "slugify";

export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all songs from your data source
  return (categories ?? []).map(category => {
    const slug = category?.slug;
    return { slug };
  });
}


export async function generateMetadata({ params }: any) {
  const slugParams = await params.id;
  const category = await fetchCategoryBySlug(slugParams);
  const title = (category?.[0]?.title ?? "Unknown")

  const slug = await category?.[0]?.slug ?? ''
  const image = await category?.[0]?.image ?? ''


  return await MetaData({ title, slug, image });
}


const Page = async ({ params }: any) => {
  const categorySlug = params.id;
  const categoryData = await fetchCategoryBySlug(categorySlug);
  const data = categoryData?.[0];
  const color = categoryData?.[0]?.color ?? "#121212"; // fallback color
  console.log(color, "category page color");

  //   console.log(categoryData, "categoryData  page data");

  console.log(data?.song, "categoryData song page data");
  return (
    <>
      <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">

        <div className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, #00000080)`
          }}>
          <Menu />
          <div className=" flex items-center gap-4 w-full ">
            <div className="sm:w-8/12 grid">
              <h1 className="sm:text-4xl text-4xl font-semibold mb-1 text-white">
                {data?.title}{" "}
              </h1>
              <p className="text-sm  text-white">Category</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold m-4 text-white">Songs on {data?.title}{" "}Category</h2>
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
