import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songbyidServerAction } from "../actions/songbyid";
// const url = "http://localhost:3000";
const url = "https://www.shalomworship.com";

const fetchSongs =   () => {
  // const res = await fetch('https://fakestoreapi.com/products');
  const res = songServerAction()
  return  res
};
const useGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: songServerAction,
  });
};
const fetchSongById = (id) => {
  const res = songbyidServerAction(id);
  return res;
};

const useGetSongById = (id) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => await songbyidServerAction(id),
  });
};

export { fetchSongById, fetchSongs, useGetSongById, useGetSongs };