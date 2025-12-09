import Menu from "@/components/layout/Menu"
import Processor from "@/components/Processor"
import { fetchSongs } from "@/lib/query/query"
import { getLanguageName } from "@/utils/getLanguageName"


// export async function generateStaticParams() {
//   const language = await fetchSongs(); // Fetch all songs from your data source
//   return (language ?? []).map(language => {
//     const slug = language?.slug;
//     return { slug };
//   });
// }


const page = async ({ params }: any) => {
    // console.log(params.slug)
    const lang = params.slug

    const songs = await fetchSongs()
    const data = songs.filter((s: any) => s.language == lang)
    // console.log(data)

    const langName = getLanguageName(lang);

    return (
        <>
            <div className="bg-background  rounded-lg">

                <div className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
                    style={{
                        // backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`
                    }}>
                    <Menu />
                    <div className=" flex items-center gap-4 w-full ">
                        <div className="sm:w-8/12 grid">
                            <h1 className="sm:text-4xl text-4xl font-semibold mb-1 text-foreground">
                                {langName}{" "}
                            </h1>
                            <p className="text-sm  text-foreground">Language</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold m-4 text-foreground">Songs in {langName}{" "}Language</h2>
                <section className="w-full px-2">
                    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2  row-span-full ">
                        {data?.reverse().map((item, index) => (
                            <div key={index}>
                                <Processor item={item.id} />
                            </div>
                        ))}
                    </div>
                </section>
                {/* <Processor params={data.song} /> */}
            </div>
        </>
    );
}

export default page