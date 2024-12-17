"use client";
import Card from "@/components/Card";
import { useGetSongs } from "@/fetch/songs";

const CircleCard = () => {
  const songs = useGetSongs();
  if (songs.isLoading) return <p>Loading Song...</p>;
  if (songs.data?.result.length === 0) return <p>No Song Found</p>;

  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0">
          {songs.data?.result.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CircleCard;
