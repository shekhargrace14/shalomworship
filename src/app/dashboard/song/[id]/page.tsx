"use client"; // we need forms & interactivity
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditSongPage() {
  const { id } = useParams();
  const [song, setSong] = useState<any>(null);

  useEffect(() => {
    async function fetchSong() {
      const res = await fetch(`/api/song/${id}`);
      const data = await res.json();
      setSong(data);
    }
    fetchSong();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/song/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    });
    alert("Song updated!");
  }

  if (!song) return <p>Loading...</p>;
  console.log(song.data,"data od sig")

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Edit Song {song?.data.title}</h1>
      <input
        type="text"
        value={song.title}
        onChange={(e) => setSong({ ...song, title: e.target.value })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Save
      </button>
    </form>
  );
}
