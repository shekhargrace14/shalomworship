import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songbyidServerAction } from "../actions/songbyid";


const fetchSongs = async () => {
  const res = await songServerAction();
  return res;
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