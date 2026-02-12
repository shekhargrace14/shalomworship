import { fetchCategoryBySlug, fetchSongById } from "@/lib/query/query";
import Card from "./ui/Card";

export default async function Category({ slug }: any) {
  const category = await fetchCategoryBySlug(slug);
    // console.log(category, "category")
  const songs = category?.[0]?.song || [];
  const songId =  songs.map(elements => elements.id)
  // console.log(songId, "songId")

  // Fetch all songs by their ids
  const songPromises = songId.map((id: string) => fetchSongById(id));
  const song = await Promise.all(songPromises);
  console.log(song, "song")

  return (
    <>
        {/* <Card item={song} /> */}
    </>
  );
}
