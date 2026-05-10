
import InContentAd from "@/components/ads/InContentAd";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { getAllCategoriesBasic, getCategory } from "@/lib/static";
import { notFound } from "next/navigation";
import slugify from "slugify";

export async function generateStaticParams() {
  const categories = await getAllCategoriesBasic(); 
  return (categories ?? []).map(category => {
    const id = category?.slug;
    return { id };
  });
}

export async function generateMetadata({ params }: any) {
  const slugParams = await params.id;
  // const category = await fetchCategoryBySlug(slugParams);
  const category = await getCategory(slugParams,[...CONTENT_VISIBILITY.discoverable]);

  const type = "category"
  const title = (category?.title ?? "Unknown")
  const metaDescription = category?.about
  const slug = await category?.slug ?? ''
  const image = await category?.image ?? ''


  return await MetaData({ type, title, metaDescription, slug, image });
}


const Page = async ({ params }: any) => {
  const categorySlug = params.id;

  // const categoryData = await fetchCategoryBySlugWithSongs(categorySlug,[...CONTENT_VISIBILITY.public,] )
  const categoryData = await getCategory(categorySlug,[...CONTENT_VISIBILITY.public,] )

  if (!categoryData) {
    notFound(); // or 410
  }

  const data = categoryData;
  const color = categoryData?.color ?? "#121212"; // fallback color

  // console.log(data?.song, "categoryData song page data");
  // const newData = await fetchCategoryBySlugWithSongs(categorySlug,[...CONTENT_VISIBILITY.public,] )
  
  return (
    <>
      <div className="bg-background  rounded-lg">

        <div className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`
          }}>
          <Menu />
          <InContentAd />
          <div className=" flex items-center gap-4 w-full ">
            <div className="sm:w-8/12 grid">
              <h1 className="sm:text-4xl text-4xl font-semibold mb-1 text-foreground">
                {data?.title}{" "}
              </h1>
              <p className="text-sm  text-foreground">Category</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold m-4 text-foreground">Songs on {data?.title}{" "}Category</h2>
        <section className="w-full px-2">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2  row-span-full ">
            {data?.song?.reverse().map((item) => (
              <div key={item.song.id}>
                <Processor item={item.song.id} />
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
