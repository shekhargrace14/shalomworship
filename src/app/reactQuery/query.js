import { useQuery } from "@tanstack/react-query";
// const url = "http://localhost:3000";
const url = "https://www.shalomworship.com";

const fetchSongs = async () => {
  // const res = await fetch('https://fakestoreapi.com/products');
  const res = await fetch( `${url}/api/song/`);
  return await res.json();
};
const useGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });
};
const fetchSongById = async (id) => {
  const res = await fetch(`${url}/api/song/${id}`);
  return await res.json();
};

const useGetSongById = (id) => {
  return useQuery({
    queryKey: ["song", id],
    queryFn: async () => await fetchSongById(id),
  });
};

export { fetchSongById, fetchSongs, useGetSongById, useGetSongs };